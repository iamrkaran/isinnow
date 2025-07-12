import Typewriter from 'typewriter-effect';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="backdrop-blur-md bg-white/30 shadow-lg border-t border-white/20 rounded-none w-full px-6 py-8 sm:px-10 lg:px-16">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
            Created by @Ram Karan
          </p>
          <div className="text-sm text-gray-800 font-medium">
            <Typewriter
              options={{
                strings: ['Crafting beautiful UIs', 'Writing clean code', 'Loving React.js'],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
