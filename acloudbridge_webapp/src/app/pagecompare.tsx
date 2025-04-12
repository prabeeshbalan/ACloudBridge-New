"use client";
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.text();
      alert(result);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <Layout>
      <div>
        <Head>
          <title>aCloudBridge</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="min-h-screen bg-[#0A192F] text-white">
          <div className="relative h-[600px] flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-4 glow-text">Welcome to aCloudBridge</h1>
              <p className="text-lg mb-8 glow-text">The Gateway to Cloud Intelligence</p>
              <p className="mb-8 glow-text">Empowering Devops, SREs & Engineers to build the future of CLV native infrastructure.</p>
              <div className="flex space-x-4">
                <button className="glassmorphism-button">Get Started</button>
                <button className="glassmorphism-button">Explore Services</button>
              </div>
            </div>
            <div className="absolute top-1/4 right-1/4 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#64FFDA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15v4c0 1.1. .9 2 2 2h14a2 2 0 002-2v-4M3 17l9-9 9 9M5 19h14" />
              </svg>
            </div>
          </div>

          <div className="bg-[#112240] py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="glassmorphism-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#64FFDA] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M16 12H4" />
                </svg>
                <h3 className="text-lg font-semibold mb-2 glow-text">Infrastructure as Code</h3>
              </div>
              <div className="glassmorphism-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#64FFDA] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold mb-2 glow-text">CI/CD Pipelines</h3>
              </div>
              <div className="glassmorphism-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#64FFDA] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-4m-2 4l-4 4m0 0l4 4m-4-4h12" />
                </svg>
                <h3 className="text-lg font-semibold mb-2 glow-text">Cloud Automation</h3>
              </div>
              <div className="glassmorphism-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#64FFDA] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-3m3 3v-6m3 6v-8m-3 3h6m-9 0a3 3 0 110-6 3 3 0 010 6zm9 0a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
                <h3 className="text-lg font-semibold mb-2 glow-text">Platform Engineering</h3>
              </div>
            </div>
          </div>

          <div className="bg-[#0A192F] py-16 px-4">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
              <img src="/images/terraform.png" alt="Terraform" className="h-10" />
              <img src="/images/ansible.png" alt="Ansible" className="h-10" />
              <img src="/images/aws.png" alt="AWS" className="h-10" />
              <img src="/images/azure.png" alt="Azure" className="h-10" />
              <img src="/images/kubernetes.png" alt="Kubernetes" className="h-10" />
            </div>
          </div>

          <div className="bg-[#112240] py-16 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 glow-text">Hi, I'm Prabe</h2>
              <p className="text-lg mb-8 glow-text">SRE, DevOps Engineer & Cloud Architect</p>
              <p className="mb-8 glow-text">With a passion for automation, I build robust infrastructure for modern applications.</p>
            </div>
          </div>

          <div className="bg-[#0A192F] py-16 px-4">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 glow-text">Contact Us</h2>
              <div className="border-b border-gray-700 w-16 mx-auto mb-8"></div>
              <p className="text-center mb-8 glow-text">Drop us a line!</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-white text-white p-2"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-white text-white p-2"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-white text-white p-2"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="newsletter" className="rounded border-gray-700 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-white">Sign up for our email list for updates, promotions, and more.</label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#64FFDA] hover:bg-[#52D3B8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#64FFDA]"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <style jsx>{`
        .glassmorphism-button {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 12px 24px;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .glassmorphism-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s ease;
        }

        .glassmorphism-card:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .glow-text {
          text-shadow: 0 0 10px #00bfff;
        }
      `}</style>
    </Layout>
  );
}