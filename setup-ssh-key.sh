#!/bin/bash
#
# SSH Key Setup for InterServer VPS
# This sets up password-less SSH authentication
#

SERVER_IP="${1:-216.158.230.187}"
SERVER_USER="${2:-root}"

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${CYAN}==> Setting up SSH key authentication${NC}"
echo ""

# Check if SSH key exists
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "Generating SSH key..."
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
    echo -e "${GREEN}✓ SSH key generated${NC}"
else
    echo -e "${GREEN}✓ SSH key already exists${NC}"
fi

echo ""
echo "Now we'll copy your SSH key to the server."
echo "You'll need to enter your server password ONE TIME."
echo ""

# Copy SSH key to server
ssh-copy-id -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  SSH KEY SETUP COMPLETE${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "You can now SSH without a password:"
    echo "  ssh $SERVER_USER@$SERVER_IP"
    echo ""
    echo "And run the deployment script:"
    echo "  ./deploy-to-interserver.sh"
    echo ""
else
    echo ""
    echo -e "${YELLOW}Setup failed. Please check your password and try again.${NC}"
    exit 1
fi
