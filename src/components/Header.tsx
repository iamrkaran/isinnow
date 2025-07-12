import Typewriter from 'typewriter-effect';

const Header = () => {
  return (
    <header className="bg-gray-100 w-full">
      <div className="w-full backdrop-blur-md bg-white/30 shadow-lg border border-white/20 px-6 py-8 sm:px-8 lg:px-12">
        <div className="text-center space-y-4">
          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
            ISIN Explorer
          </h1>

          {/* Subtitle / Typewriter Quotes */}
          <div className="text-gray-800 text-sm sm:text-base font-medium">
            <Typewriter
              options={{
                strings: [
                  'Innovation starts with simplicity.',
                  'Code is poetry.',
                  'Think big, build bigger.',
                  'Design with purpose, develop with passion.',
                  'Technology is best when it brings people together.',
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 30,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
