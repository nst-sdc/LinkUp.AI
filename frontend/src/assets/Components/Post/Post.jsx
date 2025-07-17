import React, { useState, useEffect } from 'react';
import './Post.css';
import { db } from '../../../firebase';
import { collection, addDoc, onSnapshot, Timestamp, query, orderBy, doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../utils/cloudinary';


const Post = ({ profileData, onBack }) => {
  const [postData, setPostData] = useState({
    content: '',
    image: null,
    imagePreview: null,
    hashtags: [],
    visibility: 'public',
    location: ''
  });
  
  const [newHashtag, setNewHashtag] = useState('');
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [activeTab, setActiveTab] = useState('feed'); 
  {
    id: 1,
    name: 'John Smith',
    title: 'Senior Software Engineer at Google',
    profileImage: null,
    mutualConnections: 15,
    skills: ['React', 'Node.js', 'Python'],
    connected: false
  },
  {
    id: 2,
    name: 'Lisa Chen',
    title: 'Product Manager at Microsoft',
    profileImage: null,
    mutualConnections: 8,
    skills: ['Product Strategy', 'Analytics', 'UX'],
    connected: false
  },
  {
    id: 3,
    name: 'David Rodriguez',
    title: 'Data Scientist at Netflix',
    profileImage: null,
    mutualConnections: 12,
    skills: ['Machine Learning', 'Python', 'SQL'],
    connected: false
  },
  {
    id: 4,
    name: 'Sarah Kim',
    title: 'UX Designer at Spotify',
    profileImage: null,
    mutualConnections: 6,
    skills: ['UI/UX', 'Figma', 'User Research'],
    connected: false
  }
]);


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  useEffect(() => {
    setBookmarkedPosts(posts.filter(post => post.bookmarked));
  }, [posts]);


  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsArr = [];
      snapshot.forEach((doc) => {
        postsArr.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArr);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const emojis = ['😊', '👍', '🚀', '💡', '🎉', '❤️', '🔥', '💪', '🌟', '✨', '👏', '🎯'];

  const handleInputChange = (field, value) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (file) => {
    if (file) {
      setImageUploading(true);
      setImageUploadProgress(0);
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPostData(prev => ({
            ...prev,
            imagePreview: e.target.result
          }));
        };
        reader.readAsDataURL(file);

        const cloudinaryUrl = await uploadToCloudinary(
          file,
          (progress) => setImageUploadProgress(progress),
          'post-images'
        );
        setPostData(prev => ({
          ...prev,
          image: cloudinaryUrl
        }));
      } catch (error) {
        alert(error.message || 'Failed to upload image.');
        setPostData(prev => ({ ...prev, image: null, imagePreview: null }));
      } finally {
        setImageUploading(false);
        setImageUploadProgress(0);
      }
    }
  };

  const addHashtag = () => {
    if (newHashtag.trim() && !postData.hashtags.includes(newHashtag.trim().toLowerCase())) {
      setPostData(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, newHashtag.trim().toLowerCase()]
      }));
      setNewHashtag('');
    }
  };

  const removeHashtag = (hashtagToRemove) => {
    setPostData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(tag => tag !== hashtagToRemove)
    }));
  };

  const removeImage = () => {
    setPostData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  const addEmoji = (emoji) => {
    setPostData(prev => ({
      ...prev,
      content: prev.content + emoji
    }));
    setShowEmojiPanel(false);
  };

  const handlePost = async () => {
    if (postData.content.trim() && !imageUploading) {
      let imageUrl = postData.image || null;
      if (postData.imagePreview && !imageUrl) {
        alert('Please wait for the image to finish uploading.');
        return;
      }
      const newPost = {
        author: {
          name: profileData?.name || 'You',
          title: profileData?.bio || 'LinkUp.AI User',
          profileImage: profileData?.profilePhotoPreview || null,
          verified: false
        },
        content: postData.content,
        image: imageUrl,
        hashtags: postData.hashtags,
        createdAt: Timestamp.now(),
        likes: 0,
        comments: [],
        shares: 0,
        liked: false,
        bookmarked: false,
        location: postData.location
      };
      try {
        await addDoc(collection(db, 'posts'), newPost);

        setPostData({
          content: '',
          image: null,
          imagePreview: null,
          hashtags: [],
          visibility: 'public',
          location: ''
        });
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } catch (err) {
        alert('Failed to post. Please try again.');
      }
    }
  };


  const handleLike = async (postId, liked) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      liked: !liked,
      likes: increment(!liked ? 1 : -1)
    });
  };

  const handleBookmark = async (postId, bookmarked) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      bookmarked: !bookmarked
    });
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentChange = (postId, value) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const addComment = async (postId, commentText) => {
    if (!commentText.trim()) return;
    const postRef = doc(db, 'posts', postId);
    const newComment = {
      id: Date.now(),
      author: {
        name: profileData?.name || 'You',
        title: profileData?.bio || 'LinkUp.AI User',
        profileImage: profileData?.profilePhotoPreview || null
      },
      content: commentText,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: []
    };
    await updateDoc(postRef, {
      comments: arrayUnion(newComment)
    });
    setNewComments(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCommentLike = (postId, commentId) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? {
                    ...comment,
                    liked: !comment.liked,
                    likes: comment.liked ? comment.likes - 1 : comment.likes + 1
                  }
                : comment
            )
          }
        : post
    ));
  };

  const handleConnect = (connectionId) => {
    setSuggestedConnections(prev => prev.map(connection =>
      connection.id === connectionId
        ? { ...connection, connected: !connection.connected }
        : connection
    ));
  };

  const formatHashtags = (content) => {
    return content.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return <span key={index} className="hashtag-text">{word} </span>;
      }
      return word + ' ';
    });
  };

  const formatPostContent = (content) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {formatHashtags(line)}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="post-container">

      {showNotification && (
        <div className="post-success-notification">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          Post published successfully!
        </div>
      )}


      <div className="post-header">
        <button onClick={onBack} className="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <div className="post-header-content">
          <h1>Create Post</h1>
          <p>Share your professional story with your network</p>
        </div>
      </div>

          <div className="post-author-info">
            <div className="author-avatar">
              {profileData?.profilePhotoPreview ? (
                <img src={profileData.profilePhotoPreview} alt="Profile" />
              ) : (
                <div className="avatar-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="author-details">
              <h3>{profileData?.name || 'Your Name'}</h3>
              <p>{profileData?.bio || 'Add your professional headline'}</p>
              <div className="post-visibility">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <select 
                  value={postData.visibility}
                  onChange={(e) => handleInputChange('visibility', e.target.value)}
                  className="visibility-select"
                >
                  <option value="public">Anyone</option>
                  <option value="connections">Connections only</option>
                  <option value="private">Only me</option>
                </select>
              </div>
            </div>
          </div>

          <div className="post-content-area">
            <textarea
              value={postData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="What do you want to talk about?"
              className="post-textarea"
            />


            <div className="character-counter">
              <span className={postData.content.length > 3000 ? 'over-limit' : ''}>
                {postData.content.length}/3000
              </span>
            </div>


            {postData.imagePreview && (
              <div className="image-preview">
                <img src={postData.imagePreview} alt="Post preview" />
                <button onClick={removeImage} className="remove-image-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
                {imageUploading && (
                  <div style={{ marginTop: '8px', color: '#6366F1', fontWeight: 500 }}>
                    Uploading: {imageUploadProgress}%
                  </div>
                )}
              </div>
            )}

            {postData.location && (
              <div className="location-display">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{postData.location}</span>
                <button onClick={() => handleInputChange('location', '')} className="remove-location-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            )}


            {postData.hashtags.length > 0 && (
              <div className="hashtags-display">
                {postData.hashtags.map((tag, index) => (
                  <div key={index} className="hashtag-tag">
                    <span>#{tag}</span>
                    <button 
                      type="button" 
                      onClick={() => removeHashtag(tag)}
                      className="remove-hashtag-btn"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}


            {showEmojiPanel && (
              <div className="emoji-panel">
                <div className="emoji-grid">
                  {emojis.map((emoji, index) => (
                    <button 
                      key={index} 
                      onClick={() => addEmoji(emoji)}
                      className="emoji-btn"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="post-actions">
            <div className="post-media-actions">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                id="post-image-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="post-image-upload" className="media-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                Photo
              </label>
              
              <button 
                type="button" 
                onClick={() => setShowEmojiPanel(!showEmojiPanel)}
                className="media-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 9C9.33 9 10 8.33 10 7.5S9.33 6 8.5 6 7 6.67 7 7.5 7.67 9 8.5 9zM12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4zm3.5-9c-.83 0-1.5-.67-1.5-1.5S14.67 6 15.5 6s1.5.67 1.5 1.5S16.33 9 15.5 9z"/>
                </svg>
                Emoji
              </button>

              <button 
                type="button" 
                onClick={() => {
                  const location = prompt('Add location:');
                  if (location) handleInputChange('location', location);
                }}
                className="media-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Location
              </button>

              <div className="hashtag-input-container">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  placeholder="Add hashtag"
                  className="hashtag-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addHashtag();
                    }
                  }}
                />
                <button type="button" onClick={addHashtag} className="add-hashtag-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </button>
              </div>
            </div>

            <button 
              onClick={handlePost} 
              className={`post-btn ${!postData.content.trim() || imageUploading ? 'disabled' : ''}`}
              disabled={!postData.content.trim() || imageUploading}
            >
              {imageUploading ? 'Uploading Image...' : 'Post'}
            </button>
          </div>
        </div>
      </div>


<div className="main-navigation">
  <button 
    className={`nav-tab ${activeTab === 'feed' ? 'active' : ''}`}
    onClick={() => setActiveTab('feed')}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
    </svg>
    Feed
  </button>
  <button 
    className={`nav-tab ${activeTab === 'bookmarks' ? 'active' : ''}`}
    onClick={() => setActiveTab('bookmarks')}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
    </svg>
    Bookmarks ({bookmarkedPosts.length})
  </button>
  <button 
    className={`nav-tab ${activeTab === 'connect' ? 'active' : ''}`}
    onClick={() => setActiveTab('connect')}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1-.9-2-2-2s-2 .9-2 2V18H4zm14-7.5c0-1.1-.9-2-2-2s-2 .9-2 2V18h1v4h2v-4h1v-7.5z"/>
    </svg>
    Connect
  </button>
</div>


{activeTab === 'feed' && (
  <div className="posts-feed">
    <div className="feed-header">
      <h2>Recent Posts</h2>
      <div className="feed-filters">
        <button className="filter-btn active">Recent</button>
        <button className="filter-btn">Top</button>
      </div>
    </div>

    {loading ? (
      <div className="loading-state">Loading posts...</div>
    ) : (
      posts.map((post) => (
      <div key={post.id} className="post-card">

        <div className="post-header-info">
          <div className="post-author">
            <div className="author-avatar">
              {post.author.profileImage ? (
                <img src={post.author.profileImage} alt={post.author.name} />
              ) : (
                <div className="avatar-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="author-info">
              <div className="author-name-container">
                <h4>{post.author.name}</h4>
                {post.author.verified && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0073b1" className="verified-badge">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                )}
              </div>
              <p className="author-title">{post.author.title}</p>
              <div className="post-meta">
                <span className="post-time">{post.createdAt?.toDate().toLocaleString()}</span>
                {post.location && (
                  <>
                    <span className="meta-separator">•</span>
                    <span className="post-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {post.location}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button className="post-menu-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>

        <div className="post-content">
          <p>{formatPostContent(post.content)}</p>
          {post.image && (
            <div className="post-image">
              <img src={post.image} alt="Post content" />
            </div>
          )}
        </div>


        <div className="post-stats">
          <div className="stats-left">
            <div className="reaction-icons">
              <span className="reaction-icon like">👍</span>
              <span className="reaction-icon love">❤️</span>
              <span className="reaction-icon celebrate">🎉</span>
            </div>
            <span className="stats-count">{post.likes}</span>
          </div>
          <div className="stats-right">
            <span className="stats-item" onClick={() => toggleComments(post.id)}>
              {post.comments.length} comments
            </span>
            <span className="stats-separator">•</span>
            <span className="stats-item">{post.shares} reposts</span>
          </div>
        </div>

        <div className="post-interactions">
          <button 
            className={`interaction-btn ${post.liked ? 'liked' : ''}`}
            onClick={() => handleLike(post.id, post.liked)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.5 2.5C10.5 2.5 12 4.5 12 4.5s1.5-2 4.5-2C19.54 2.5 22 4.96 22 8c0 4.5-8 11-10 11S2 12.5 2 8c0-3.04 2.46-5.5 5.5-5.5z"/>
            </svg>
            Like
          </button>
          <button 
            className="interaction-btn"
            onClick={() => toggleComments(post.id)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
            </svg>
            Comment
          </button>
          <button className="interaction-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
            Repost
          </button>
          <button className="interaction-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>
            </svg>
            Send
          </button>
          <button 
            className={`interaction-btn bookmark ${post.bookmarked ? 'bookmarked' : ''}`}
            onClick={() => handleBookmark(post.id, post.bookmarked)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        </div>


            <div className="add-comment">
              <div className="comment-author-avatar">
                {profileData?.profilePhotoPreview ? (
                  <img src={profileData.profilePhotoPreview} alt="Your profile" />
                ) : (
                  <div className="avatar-placeholder">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="comment-input-container">
                <textarea
                  value={newComments[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                  rows="2"
                />
                <button 
                  onClick={() => addComment(post.id, newComments[post.id])}
                  className={`comment-submit-btn ${!newComments[post.id]?.trim() ? 'disabled' : ''}`}
                  disabled={!newComments[post.id]?.trim()}
                >
                  Post
                </button>
              </div>
            </div>


            <div className="comments-list">
              {post.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-author-avatar">
                    {comment.author.profileImage ? (
                      <img src={comment.author.profileImage} alt={comment.author.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="comment-content">
                    <div className="comment-bubble">
                      <div className="comment-header">
                        <h5 className="comment-author-name">{comment.author.name}</h5>
                        <span className="comment-author-title">{comment.author.title}</span>
                      </div>
                      <p className="comment-text">{comment.content}</p>
                    </div>
                    <div className="comment-actions">
                      <button 
                        className={`comment-like-btn ${comment.liked ? 'liked' : ''}`}
                        onClick={() => handleCommentLike(post.id, comment.id)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.5 2.5C10.5 2.5 12 4.5 12 4.5s1.5-2 4.5-2C19.54 2.5 22 4.96 22 8c0 4.5-8 11-10 11S2 12.5 2 8c0-3.04 2.46-5.5 5.5-5.5z"/>
                        </svg>
                        Like
                      </button>
                      <button className="comment-reply-btn">Reply</button>
                      <span className="comment-time">{comment.timestamp}</span>
                      {comment.likes > 0 && (
                        <span className="comment-likes">{comment.likes} likes</span>
                      )}
                    </div>


                    {comment.replies && comment.replies.length > 0 && (
                      <div className="comment-replies">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="comment reply">
                            <div className="comment-author-avatar">
                              {reply.author.profileImage ? (
                                <img src={reply.author.profileImage} alt={reply.author.name} />
                              ) : (
                                <div className="avatar-placeholder">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="comment-content">
                              <div className="comment-bubble">
                                <div className="comment-header">
                                  <h5 className="comment-author-name">{reply.author.name}</h5>
                                  <span className="comment-author-title">{reply.author.title}</span>
                                </div>
                                <p className="comment-text">{reply.content}</p>
                              </div>
                              <div className="comment-actions">
                                <button className="comment-like-btn">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.5 2.5C10.5 2.5 12 4.5 12 4.5s1.5-2 4.5-2C19.54 2.5 22 4.96 22 8c0 4.5-8 11-10 11S2 12.5 2 8c0-3.04 2.46-5.5 5.5-5.5z"/>
                                  </svg>
                                  Like
                                </button>
                                <span className="comment-time">{reply.timestamp}</span>
                                {reply.likes > 0 && (
                                  <span className="comment-likes">{reply.likes} likes</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ))
    )}
  </div>
)}


{activeTab === 'bookmarks' && (
  <div className="bookmarks-section">
    <div className="section-header">
      <h2>Bookmarked Posts</h2>
      <p>Posts you've saved for later</p>
    </div>
    
    {bookmarkedPosts.length === 0 ? (
      <div className="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
        </svg>
        <h3>No bookmarks yet</h3>
        <p>When you bookmark posts, they'll appear here</p>
      </div>
    ) : (
      <div className="bookmarks-list">
        {bookmarkedPosts.map((post) => (
          <div key={post.id} className="bookmark-item">
            <div className="bookmark-content">
              <div className="bookmark-author">
                <div className="author-avatar">
                  {post.author.profileImage ? (
                    <img src={post.author.profileImage} alt={post.author.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="author-info">
                  <h4>{post.author.name}</h4>
                  <span className="post-time">{post.createdAt?.toDate().toLocaleDateString()}</span>
                </div>
              </div>
              <p className="bookmark-text">{post.content.substring(0, 150)}...</p>
              <div className="bookmark-stats">
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
              </div>
            </div>
            <button 
              className="remove-bookmark-btn"
              onClick={() => handleBookmark(post.id, post.bookmarked)}
              title="Remove bookmark"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)}


{activeTab === 'connect' && (
  <div className="connect-section">
    <div className="section-header">
      <h2>People You May Know</h2>
      <p>Connect with professionals in your network</p>
    </div>
    
    <div className="connections-grid">
      {suggestedConnections.map((connection) => (
        <div key={connection.id} className="connection-card">
          <div className="connection-header">
            <div className="connection-avatar">
              {connection.profileImage ? (
                <img src={connection.profileImage} alt={connection.name} />
              ) : (
                <div className="avatar-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>
            <button className="connection-menu-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
          </div>
          
          <div className="connection-info">
            <h4>{connection.name}</h4>
            <p className="connection-title">{connection.title}</p>
            <div className="mutual-connections">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1-.9-2-2-2s-2 .9-2 2V18H4zm14-7.5c0-1.1-.9-2-2-2s-2 .9-2 2V18h1v4h2v-4h1v-7.5z"/>
              </svg>
              <span>{connection.mutualConnections} mutual connections</span>
            </div>
            
            <div className="connection-skills">
              {connection.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="connection-actions">
            <button 
              className={`connect-btn ${connection.connected ? 'connected' : ''}`}
              onClick={() => handleConnect(connection.id)}
            >
              {connection.connected ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Connected
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  Connect
                </>
              )}
            </button>
            <button className="message-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
              </svg>
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
};

export default Post;