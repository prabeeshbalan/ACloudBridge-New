import React from 'react';
import Image from 'next/image';
import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-[35vw] relative mx-auto">
      {/* Top Background Image (Limited Height) */}
      <div className="relative top-0 left-0 w-full h-70 overflow-hidden z-1">
        <Image
          src="/background-image.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
        {/* Circular Profile Image (Overlay) */}
        <div className="absolute top-8 left-10 w-35 h-35 rounded-full overflow-hidden border-4 border-white">
          <Image
            src="/profile-image.jpg"
            alt="Prabeesh Balan"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Text Overlay */}
        <div className="absolute top-45 left-8 text-[#027bc2]">
          <h1 className="text-xl font-bold">Prabeesh Balan (He/Him)</h1>
          <p className="text-sm">
            SRE / Platform / DevOps Engineer | Cloud & Automation Specialist
          </p>
          <p className="text-sm">
            Brampton, Ontario, Canada - <a href="mailto:prabeesh.balan@gmail.com" className="underline">Contact Info</a>
          </p>
        </div>
      </div>
      {/* Profile Section Container (with Depth) */}
      <div className="relative p-10 rounded-lg"> {/* Removed top-17 and mt-54 */}
        {/* Content Background Image (Below Top Image) */}
        <div className="absolute inset-0 opacity-20 z-0">
          <Image
            src="/background-content.jpg"
            alt="Content Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* About Me Section */}
        <div className="relative z-2">
          <h2 className="text-base font-semibold mt-8 mb-4 text-[#065A8B]">
            Azure Certified | Cloud Platform Enthusiast | AWS | Azure | Kubernetes | Terraform | Bash |<br />
             Linux | Powershell | Ansible | CI/CD | Jenkins | Docker | Python |
          </h2>
          <h2 className="text-base font-semibold mt-8 mb-4 text-[#065A8B]">
            SRE / Platform / DevOps Engineer | Cloud & Automation Specialist <br />
          </h2>
          <p className="text-base text-[#065A8B]">
            📌 Passionate about CI/CD, Cloud, and Infrastructure as Code (IaC) <br />
            📌 Experienced with AWS | Azure | Docker | Kubernetes | Terraform <br />
            📌 Always learning & exploring new DevOps tools!
          </p>
        </div>
        {/* Tech Stack Section */}
        <div className="mb-8 relative z-2 ">
          <h2 className="text-base font-semibold mt-8 mb-2 text-[#065A8B]">🔧 Tech Stack:</h2>
          <ul className="list-disc list-inside text-[#065A8B]">
            <li>Cloud: ☁️ Azure | AWS</li>
            <li>IaC: 🏗 Terraform | Ansible | CloudFormation | ARM</li>
            <li>CI/CD: 🚀 GitHub Actions | Jenkins</li>
            <li>OS: 🖥 Windows | Linux | macOS</li>
            <li>Virtualization: 🖥 VMWare | Hyper-V</li>
            <li>Containerization: 📦 Docker</li>
            <li>Orchestration: ⚡ Kubernetes - AKS/EKS/GKE | Docker Swarm</li>
            <li>Monitoring Tools: 📊 Prometheus | Grafana | ELK Stack | Splunk</li>
          </ul>
        </div>
        {/* LinkedIn and GitHub Links */}
        <div className="flex justify-center space-x-4 relative z-2">
          <a
            href="https://www.linkedin.com/in/prabeeshbalan/"
            className={styles.linkedinButton}
            aria-label="LinkedIn Profile"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            href="https://github.com/prabeeshbalan"
            className={styles.githubButton}
            aria-label="GitHub Profile"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>
    </div>
  );
}