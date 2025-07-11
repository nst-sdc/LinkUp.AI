import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';

export const getAllProfiles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'profiles'));
    const profiles = [];
    querySnapshot.forEach((doc) => {
      profiles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return profiles;
  } catch (error) {
    console.error('Error getting profiles:', error);
    throw error;
  }
};

export const getProfileById = async (profileId) => {
  try {
    const docRef = doc(db, 'profiles', profileId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Profile not found');
    }
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
};

export const getProfilesByEmail = async (email) => {
  try {
    const q = query(
      collection(db, 'profiles'),
      where('personalInfo.email', '==', email),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const profiles = [];
    querySnapshot.forEach((doc) => {
      profiles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return profiles;
  } catch (error) {
    console.error('Error getting profiles by email:', error);
    throw error;
  }
};

export const getRecentProfiles = async () => {
  try {
    const q = query(
      collection(db, 'profiles'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const profiles = [];
    querySnapshot.forEach((doc) => {
      profiles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return profiles;
  } catch (error) {
    console.error('Error getting recent profiles:', error);
    throw error;
  }
};

export const logProfileStructure = (profile) => {
  console.log('📋 Profile Structure:');
  console.log('ID:', profile.id);
  console.log('Personal Info:', profile.personalInfo);
  console.log('Social Links:', profile.socialLinks);
  console.log('Skills:', profile.skills);
  console.log('Certificates:', profile.certificates);
  console.log('Projects:', profile.projects);
  console.log('Education:', profile.education);
  console.log('Experience:', profile.experience);
  console.log('Achievements:', profile.achievements);
  console.log('Upload Stats:', profile.uploadStats);
  console.log('Created At:', profile.createdAt?.toDate());
  console.log('Updated At:', profile.updatedAt?.toDate());
}; 