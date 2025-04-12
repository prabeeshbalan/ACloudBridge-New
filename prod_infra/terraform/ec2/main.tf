resource "aws_instance" "acloudbridge-ec2" {

  ami                         = "ami-0453ec754f44f9a4a"
  instance_type               = "t2.micro"
  subnet_id                   = var.acloudbridge-subnet-public-us-east-1a_id
  vpc_security_group_ids      = [var.acloudbridge-public-sg_id]
  associate_public_ip_address = true

  key_name = "acloudbridge_tf_key"

  tags = {
    Name = "acloudbridge-ec2"
  }

}

resource "aws_key_pair" "acloudbridge_tf_key" {

  key_name   = "acloudbridge_tf_key"
  public_key = tls_private_key.rsa.public_key_openssh

}

resource "tls_private_key" "rsa" {

  algorithm = "RSA"
  rsa_bits  = 4096

}

resource "local_file" "acloudbridge_tf_key" {

  content  = tls_private_key.rsa.private_key_pem
  filename = "acloudbridge_tf_key.pem"

}

output "instance_public_ip" {
  value = aws_instance.acloudbridge-ec2.public_ip
}