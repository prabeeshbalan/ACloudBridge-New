# Create network acl
resource "aws_network_acl" "acloudbridge-nacl" {
  vpc_id = var.acloudbridge-vpc_id

  egress {
    protocol   = "-1"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  ingress {
    protocol   = "-1"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  tags = {
    Name = "acloudbridge-nacl"
  }
}

# nacl-subnet association
resource "aws_network_acl_association" "acloudbridge1-nacl-subnet" {
  network_acl_id = aws_network_acl.acloudbridge-nacl.id
  subnet_id      = var.acloudbridge-subnet-public-us-east-1a_id
}
resource "aws_network_acl_association" "acloudbridge2-nacl-subnet" {
  network_acl_id = aws_network_acl.acloudbridge-nacl.id
  subnet_id      = var.acloudbridge-subnet-public-us-east-1b_id
}
resource "aws_network_acl_association" "acloudbridge3-nacl-subnet" {
  network_acl_id = aws_network_acl.acloudbridge-nacl.id
  subnet_id      = var.acloudbridge-subnet-private-us-east-1a_id
}
resource "aws_network_acl_association" "acloudbridge4-nacl-subnet" {
  network_acl_id = aws_network_acl.acloudbridge-nacl.id
  subnet_id      = var.acloudbridge-subnet-private-us-east-1b_id
}