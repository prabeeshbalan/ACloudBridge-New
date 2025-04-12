# Public route table for internet access
resource "aws_route_table" "acloudbridge-rtb-public" {
  vpc_id = var.acloudbridge-vpc_id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = var.acloudbridge-igw_id
  }
  tags = {
    Name = "acloudbridge-rtb-public"
  }
}

# two local route table for access within vpc to attach to private subnet
resource "aws_route_table" "acloudbridge-rtb-private-us-east-1a" {
  vpc_id = var.acloudbridge-vpc_id

  tags = {
    Name = "acloudbridge-rtb-private-us-east-1a"
  }
}
resource "aws_route_table" "acloudbridge-rtb-private-us-east-1b" {
  vpc_id = var.acloudbridge-vpc_id

  tags = {
    Name = "acloudbridge-rtb-private-us-east-1b"
  }
}

# Route table-subnet associations
resource "aws_route_table_association" "acloudbridge1-rtb-public" {
  subnet_id      = var.acloudbridge-subnet-public-us-east-1a_id
  route_table_id = aws_route_table.acloudbridge-rtb-public.id
}
resource "aws_route_table_association" "acloudbridge2-rtb-public" {
  subnet_id      = var.acloudbridge-subnet-public-us-east-1b_id
  route_table_id = aws_route_table.acloudbridge-rtb-public.id
}
resource "aws_route_table_association" "acloudbridge-rtb-private-us-east-1a" {
  subnet_id      = var.acloudbridge-subnet-private-us-east-1a_id
  route_table_id = aws_route_table.acloudbridge-rtb-private-us-east-1a.id
}
resource "aws_route_table_association" "acloudbridge-rtb-private-us-east-1b" {
  subnet_id      = var.acloudbridge-subnet-private-us-east-1b_id
  route_table_id = aws_route_table.acloudbridge-rtb-private-us-east-1b.id
}