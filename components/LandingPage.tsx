import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Legacy
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Story Preservation
          </p>

          <div className="mb-12">
            <p className="text-lg text-gray-700 mb-4">
              Transform your wisdom and experiences into an interactive AI companion for future generations.
            </p>
            <p className="text-md text-gray-600">
              Share your stories, preserve your memories, and create a lasting legacy that your loved ones can interact with forever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="font-semibold text-lg mb-2">Share Stories</h3>
              <p className="text-gray-600 text-sm">
                Record your life experiences and memories
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold text-lg mb-2">AI Companion</h3>
              <p className="text-gray-600 text-sm">
                Powered by Google Gemini AI technology
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg">
              <div className="text-4xl mb-3">💝</div>
              <h3 className="font-semibold text-lg mb-2">Forever Legacy</h3>
              <p className="text-gray-600 text-sm">
                Preserve your wisdom for generations to come
              </p>
            </div>
          </div>

          <button
            onClick={onStart}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Legacy
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
