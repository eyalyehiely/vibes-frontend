import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const Team = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
  ];

  return (
    <section id="team" className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Our Team</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Meet the Experts
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Dedicated professionals working to bring your vision to life
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative">
                <img
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                  src={member.image}
                  alt={member.name}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-600/20 to-transparent" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-purple-600">{member.role}</p>
              </div>
              <div className="mt-2 flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;