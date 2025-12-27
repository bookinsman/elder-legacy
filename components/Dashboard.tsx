import React, { useState } from 'react';
import { Story, Badge } from '../types';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const badges: Badge[] = [
    { label: 'First Story', unlocked: stories.length >= 1 },
    { label: 'Storyteller', unlocked: stories.length >= 5 },
    { label: 'Memory Keeper', unlocked: stories.length >= 10 },
    { label: 'Legacy Builder', unlocked: stories.length >= 20 },
  ];

  const handleSaveStory = () => {
    if (currentStory.trim() && storyTitle.trim()) {
      const newStory: Story = {
        id: Date.now().toString(),
        title: storyTitle,
        content: currentStory,
        date: new Date().toLocaleDateString(),
      };
      setStories([newStory, ...stories]);
      setCurrentStory('');
      setStoryTitle('');
    }
  };

  const handleAskAI = async () => {
    if (!selectedStory) return;

    setIsLoading(true);
    setAiResponse('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Tell me more about this story: ${selectedStory.title}. Content: ${selectedStory.content}`,
        }),
      });

      const data = await response.json();
      setAiResponse(data.response || 'Unable to generate response. Please check your API key.');
    } catch (error) {
      setAiResponse('Error connecting to AI. Please ensure your GEMINI_API_KEY is set correctly.');
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, you would integrate with the microphone API here
    alert('Voice recording would start here. For now, please type your story.');
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Legacy Dashboard</h1>
              <p className="text-gray-600 mt-1">Stories preserved: {stories.length}</p>
            </div>
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Story Creation Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create a New Story</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Story Title
                </label>
                <input
                  type="text"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder="Give your story a title..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Story
                </label>
                <textarea
                  value={currentStory}
                  onChange={(e) => setCurrentStory(e.target.value)}
                  placeholder="Share your memories, wisdom, and experiences..."
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveStory}
                  disabled={!currentStory.trim() || !storyTitle.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Story
                </button>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                >
                  {isRecording ? '⏹️ Stop' : '🎤 Record'}
                </button>
              </div>
            </div>

            {/* Badges Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Achievements</h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center ${
                      badge.unlocked
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.unlocked ? '🏆' : '🔒'}</div>
                    <div className="text-xs font-semibold">{badge.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stories List & AI Interaction */}
          <div className="space-y-6">
            {/* Saved Stories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Stories</h2>

              {stories.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-5xl mb-3">📚</div>
                  <p>No stories yet. Start preserving your legacy!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {stories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedStory?.id === story.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">{story.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{story.content}</p>
                      <p className="text-xs text-gray-400 mt-2">{story.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Interaction */}
            {selectedStory && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Companion</h2>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Selected: <span className="font-semibold">{selectedStory.title}</span>
                  </p>
                  <button
                    onClick={handleAskAI}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Thinking...' : 'Ask AI About This Story'}
                  </button>
                </div>

                {aiResponse && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">AI Response:</p>
                    <p className="text-gray-800">{aiResponse}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
