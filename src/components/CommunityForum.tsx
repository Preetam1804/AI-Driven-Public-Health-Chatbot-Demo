import React, { useState } from 'react';
import { Users, MessageCircle, ThumbsUp, Clock, Send } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: number;
  category: string;
  isLiked: boolean;
}

export function CommunityForum() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Dr. Priya Sharma',
      avatar: '👩‍⚕️',
      title: 'Tips for Managing Diabetes in Summer',
      content: 'During hot weather, people with diabetes need to take extra care. Stay hydrated, monitor blood sugar more frequently, and store medications properly...',
      timestamp: new Date(Date.now() - 3600000),
      likes: 24,
      replies: 8,
      category: 'Diabetes',
      isLiked: false
    },
    {
      id: '2',
      author: 'Ramesh Kumar',
      avatar: '👨',
      title: 'Question: High BP medication timing',
      content: 'My doctor prescribed BP medication to be taken in the morning. Is it okay to take it in the evening instead? What are your experiences?',
      timestamp: new Date(Date.now() - 7200000),
      likes: 12,
      replies: 15,
      category: 'Blood Pressure',
      isLiked: true
    },
    {
      id: '3',
      author: 'Community Health Worker',
      avatar: '🏥',
      title: 'Free Health Checkup Camp - Bangalore',
      content: 'We are organizing a free health checkup camp next Sunday at Community Center, Koramangala. Services include BP check, diabetes screening, BMI...',
      timestamp: new Date(Date.now() - 10800000),
      likes: 45,
      replies: 23,
      category: 'Events',
      isLiked: false
    }
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const categories = ['General', 'Diabetes', 'Blood Pressure', 'Heart Health', 'Mental Health', 'Events', 'Questions'];

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const createPost = () => {
    if (!newPost.title || !newPost.content) return;

    const post: Post = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '👤',
      title: newPost.title,
      content: newPost.content,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      category: newPost.category || 'General',
      isLiked: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', category: '' });
    setShowNewPostForm(false);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'General': 'bg-gray-100 text-gray-800',
      'Diabetes': 'bg-blue-100 text-blue-800',
      'Blood Pressure': 'bg-red-100 text-red-800',
      'Heart Health': 'bg-pink-100 text-pink-800',
      'Mental Health': 'bg-purple-100 text-purple-800',
      'Events': 'bg-green-100 text-green-800',
      'Questions': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || colors.General;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users className="w-7 h-7 mr-3 text-blue-600" />
              Community Forum
            </h1>
            <p className="text-gray-600 mt-1">Connect with others, share experiences, and get health tips</p>
          </div>
          <button 
            onClick={() => setShowNewPostForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            New Post
          </button>
        </div>
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-500">Active Members</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">523</p>
              <p className="text-sm text-gray-500">Discussions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ThumbsUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2,156</p>
              <p className="text-sm text-gray-500">Helpful Answers</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-orange-600 text-lg">🏥</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-gray-500">Health Experts</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Create New Post</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={newPost.category}
                onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter post title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Share your health question, tip, or experience..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowNewPostForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createPost}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {post.avatar}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{post.author}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.timestamp.toLocaleDateString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h4>
                <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      post.isLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replies} replies</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Guidelines */}
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Community Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
              <p className="text-gray-700">Be respectful and supportive to all members</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
              <p className="text-gray-700">Share experiences, not medical advice</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
              <p className="text-gray-700">Always consult healthcare professionals for medical decisions</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
              <p className="text-gray-700">Report inappropriate content to moderators</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}