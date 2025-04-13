
# Security group public access
resource "aws_security_group" "acloudbridge-public-sg" {

  name   = "acloudbridge-public-sg"
  vpc_id = var.acloudbridge-vpc_id

  tags = {
    Name = "acloudbridge-public-sg"
  }
}

# inbound rules to all ssh to 22 from everywhere
resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4" {
  security_group_id = aws_security_group.acloudbridge-public-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

# inbound rules to all ssh to 22 from everywhere
resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4_3000" {
  security_group_id = aws_security_group.acloudbridge-public-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 3000
  ip_protocol       = "tcp"
  to_port           = 3000
}

resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4_5000" {
  security_group_id = aws_security_group.acloudbridge-public-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 5000
  ip_protocol       = "tcp"
  to_port           = 5000
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.acloudbridge-public-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4_3306" {
    security_group_id = aws_security_group.acloudbridge-public-sg.id
    cidr_ipv4         = "0.0.0.0/0"
    from_port         = 5432
    ip_protocol       = "tcp"
    to_port           = 5432
}

resource "aws_vpc_security_group_egress_rule" "allow_mysql_outbound" {
    security_group_id = aws_security_group.acloudbridge-public-sg.id
    cidr_ipv4       = "0.0.0.0/0"
    from_port         = 5432
    to_port           = 5432
    ip_protocol       = "tcp"
}