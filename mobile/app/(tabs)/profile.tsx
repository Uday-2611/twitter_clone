import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SignOutButton from '@/components/SignOutButton';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { usePosts } from '@/hooks/usePosts';
import PostsList from '@/components/PostList';
import { useProfile } from '@/hooks/useProfile';
import EditProfileModal from '@/components/EditProfileModal';

const ProfileScreen = () => {

  const { currentUser, isLoading } = useCurrentUser();
  const insets = useSafeAreaInsets();

  const { posts: userPosts, refetch: refetchPosts, isLoading: isRefetching } = usePosts(currentUser?.username);

  const { isEditModalVisible, openEditModal, closeEditModal, formData, saveProfile, updateFormField, isUpdating, refetch: refetchProfile, } = useProfile();

  if (isLoading) {
    return (
      <View className='flex-1 bg-white items-center justify-center'>
        <ActivityIndicator size='large' color='#1DA1F2' />
      </View>
    );
  }

  return (
    <SafeAreaView className='bg-white flex-1' edges={['top']}>
      {/* Header -> */}
      <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100'>
        <View>
          <Text className='text-xl font-bold text-gray-900'>{currentUser.firstName} {currentUser.lastName}</Text>
          <Text className='text-gray-500 text-sm'>{userPosts.length} Posts</Text>
        </View>
        <SignOutButton />
      </View>

      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetchProfile();
              refetchPosts();
            }}
            colors={['#1DA1F2']}
            tintColor='#1DA1F2'
          />
        }
      >
        <Image
          source={{ uri: currentUser.bannerImage || 'https://images.unsplash.com/photo-1506765515384-028b60a970df?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFubmVyfGVufDB8fDB8fHww' }}
          className='w-full h-48'
          resizeMode='cover'
        />

        <View className='px-4 pb-4 border-b border-gray-100'>
          <View className='flex-row justify-between items-end -mt-16 mb-4'>
            <Image
              source={{ uri: currentUser.profilePicture }}
              className='w-32 h-32 rounded-full border-4 border-white'
            />
            <TouchableOpacity onPress={openEditModal} className='border border-gray-300 px-6 py-2 rounded-full'>
              <Text className='font-semibold text-gray-900'>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View className='mb-4'>
            <View className='flex-row items-center mb-1'>
              <Text className='text-xl font-bold text-gray-900 mr-1'>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              <Feather name='check-circle' size={20} color='#1DA1F2' />

            </View>

            <Text className='text-gray-500 mb-2'>{currentUser.username}</Text>
            <Text className='text-gray-900 mb-3'>{currentUser.bio}</Text>

            <View className='flex-row items-center mb-2'>
              <Feather name='map-pin' size={16} color='#657786' />
              <Text className='text-gray-500 ml-2' >{currentUser.location}</Text>
            </View>

            <View className='flex-row items-center mb-3'>
              <Feather name='calendar' size={16} color='#657786' />
              <Text className='text-gray-500 ml-2' >Joined {format(new Date(currentUser.createdAt), "MMMM yyyy")}</Text>
            </View>

            <View className="flex-row gap-2">
              <TouchableOpacity className="mr-6">
                <Text className="text-gray-900">
                  <Text className="font-bold">{currentUser.following?.length}</Text>
                  <Text className="text-gray-500"> Following</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-gray-900">
                  <Text className="font-bold">{currentUser.followers?.length}</Text>
                  <Text className="text-gray-500"> Followers</Text>
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        <PostsList username={currentUser?.username} />

      </ScrollView>

      <EditProfileModal
        isVisible={isEditModalVisible}
        onClose={closeEditModal}
        formData={formData}
        saveProfile={saveProfile}
        updateFormField={updateFormField}
        isUpdating={isUpdating}
      />
    </SafeAreaView>
  )
}

export default ProfileScreen