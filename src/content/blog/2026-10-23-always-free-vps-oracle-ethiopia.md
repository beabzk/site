---
title: "How I Got an Always-Free 12GB RAM VPS on Oracle Cloud"
description: "A step-by-step guide to provisioning an always-free, 12 GB RAM VM on Oracle Cloud Infrastructure."
pubDate: "2026-10-23"
tags: ["oracle-cloud", "vps", "cloud-hosting"]
draft: false
---

# How I Got an Always-Free 12GB RAM VPS on Oracle Cloud

If you are a developer in Ethiopia, you know the struggle: you want to host personal projects, a bot, or a self-hosted platform, but you hit the infamous forex wall. Local cards don't work on global cloud providers, and international platforms love to reject virtual cards.

Recently, I managed to get a fully provisioned, **Always-Free Tier** virtual machine on **Oracle Cloud Infrastructure (OCI)** with these specs:

- **CPU:** 2 OCPUs (dedicated ARM Neoverse-N1 cores)
- **RAM:** 12 GB
- **Storage:** 200 GB NVMe/SSD (at 96 MB/s throughput)
- **Swap:** 4 GB
- **Cost:** $0.00 / month

Here is the exact step-by-step guide on how I did it, including the payment card that worked and how to bypass the common traps in Oracle's setup wizard.

---

## 1. The Payment Card

Oracle Cloud requires a credit or debit card during registration to verify your identity. They perform a temporary hold (around $1.00 USD) and immediately refund it.

I used my **Bybit Visa Card** (labeled _Visa Platinum_). You don't need access to local bank forex queues. If you have USDT or crypto on Bybit, you can fund your Bybit Card, and Oracle's payment processor accepts it without flagging it as an unsupported prepaid card. Make sure your card has at least $2–$5 worth of balance available before starting so the verification charge doesn't fail.

---

## 2. Choosing Your Home Region

During sign-up, you must pick a **Home Region**. I picked **Germany Central (Frankfurt)** (`eu-frankfurt-1`). It offers great ping to East Africa and Europe. However, Frankfurt is high-demand, which leads to a hardware capacity bottleneck (more on how to beat that in Step 5).

---

## 3. The "VCN Trap" (Do This First!)

Before spinning up the server, **do not let the VM creation wizard create your network automatically**. There is a bug where inline networks can leave your VM without an Internet Gateway or a public IP address.

Instead, build your network first:

1. Open the top-left menu → **Networking** → **Virtual cloud networks**.
2. Click **Start VCN Wizard** _(not "Create VCN")_.
3. Choose **Create VCN with Internet Connectivity** → **Start VCN Wizard**.
4. Name it `my-vcn` or whatever, leave all default CIDR blocks as they are, and click **Create**.

Now your Virtual Cloud Network has an Internet Gateway and a functional Public Subnet ready to go.


---

## 4. Configuring the Compute Instance

Go to **Compute** → **Instances** → **Create Instance**. Here are the critical settings:

### A. The OS Image (Don't pick standard x86!)

- Under **Image**, click **Change Image**.
- Filter for **Oracle Linux 9.x ARM** (or Ubuntu Minimal).
- Choose the ARM image so you get the free ARM shape.

### B. The Shape

- Select **VM.Standard.A1.Flex**.
- This is the only ARM shape in the Always-Free tier.

### C. Networking & Public IP

- Under **Attach public IPv4 address**, make sure toggle is **ON**.

### D. SSH Keys

- Click **Generate a key pair for me** and click **Download private key**.
- ⚠️ **Do not skip this:** Save that `.key` file. You will not be able to log in without it.

### E. Storage (Maximize your 200 GB)

- Under **Storage**, check **Specify a custom boot volume size**.
- Change the default from 46.6 GB to **`200` GB**.
- _Bonus:_ Disk throughput scales with size. A 200 GB volume runs at **96 MB/s** compared to just 24 MB/s on the default size.

---




---

## 5. "Out of host capacity"

When you click **Create**, you might get hit with:

> `API Error: Out of capacity for shape VM.Standard.A1.Flex in availability domain AD-3.`

Frankfurt has three separate data center buildings: `AD-1`, `AD-2`, and `AD-3`. If AD-3 is full:

1. Go back to the **Placement** section.
2. Switch the Availability Domain from **AD-3** to **AD-1**.
3. Hit **Create**.

_(AD-1 worked immediately for me! If AD-1 is full, try AD-2)._

---

## 6. Connecting from Windows

Once the instance turns green (**Running**), find your **Public IP Address**.

If you are using Windows PowerShell and OpenSSH, you might see this error when connecting:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: UNPROTECTED PRIVATE KEY FILE! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions are too open.
```

Windows NTFS folders give read access to other system groups by default. Fix it by running these two lines in PowerShell:

```powershell
# Reset inherited permissions
icacls.exe "$HOME\.ssh\your-key-name.key" /inheritance:r

# Grant read access only to your personal Windows account
icacls.exe "$HOME\.ssh\your-key-name.key" /grant:r "$($env:USERNAME):(R)"
```
Replace the files paths with your actual .key file location.

Now you can connect smoothly:

```bash
ssh -i ~/.ssh/your-key-name.key ubuntu@<YOUR_PUBLIC_IP>
```

---

## 7. Post-Setup

Ubuntu Minimal doesn't come with swap by default. Even with 12 GB RAM, adding a 4 GB swap file on your 200 GB SSD gives a great buffer against out-of-memory crashes:

```bash
# 1. Allocate a 4GB file
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 2. Make it persist across reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 3. Optimize swappiness (prefer RAM over disk)
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

Verify everything by running `free -h` or checking with `fastfetch`!

---

## Summary

In less than 15 minutes, you have a 12 GB server running 24/7 without paying a single Birr or dollar.

If you are building projects from Ethiopia, grab a Bybit card, follow this setup, and take full advantage of Oracle's Always Free tier!
