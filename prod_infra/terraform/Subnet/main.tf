
# two public subents
resource "aws_subnet" "acloudbridge-subnet-public-us-east-1a" {
  vpc_id     = var.acloudbridge-vpc_id
  cidr_block = "10.0.1.0/24"

  availability_zone = "us-east-1a"

  tags = {
    Name = "acloudbridge-subnet-public-us-east-1a"
  }
}

resource "aws_subnet" "acloudbridge-subnet-public-us-east-1b" {
  vpc_id     = var.acloudbridge-vpc_id
  cidr_block = "10.0.2.0/24"

  availability_zone = "us-east-1b"

  tags = {
    Name = "acloudbridge-subnet-public-us-east-1b"
  }
}

# two private subents
resource "aws_subnet" "acloudbridge-subnet-private-us-east-1a" {
  vpc_id     = var.acloudbridge-vpc_id
  cidr_block = "10.0.3.0/24"

  availability_zone = "us-east-1a"

  tags = {
    Name = "acloudbridge-subnet-private-us-east-1a"
  }
}

resource "aws_subnet" "acloudbridge-subnet-private-us-east-1b" {
  vpc_id     = var.acloudbridge-vpc_id
  cidr_block = "10.0.4.0/24"

  availability_zone = "us-east-1b"

  tags = {
    Name = "acloudbridge-subnet-private-us-east-1b"
  }
}