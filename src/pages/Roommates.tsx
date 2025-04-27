
import React from 'react';
import { useFridgely } from '@/context/FridgelyContext';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Roommates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [inviteEmail, setInviteEmail] = React.useState('');

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch roommate connections
  const { data: roommates, isLoading: roommatesLoading } = useQuery({
    queryKey: ['roommates'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('roommate_connections')
        .select(`
          id,
          status,
          roommate_id
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Now fetch the profile data for each roommate
      if (data && data.length > 0) {
        const roommateIds = data.map(connection => connection.roommate_id);
        
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, username, avatar_url')
          .in('id', roommateIds);
          
        if (profilesError) throw profilesError;
        
        // Join the data
        return data.map(connection => {
          const roommateProfile = profiles?.find(p => p.id === connection.roommate_id);
          return {
            ...connection,
            roommate: roommateProfile || { username: 'Unknown', avatar_url: null }
          };
        });
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  // Toggle share inventory
  const toggleShareMutation = useMutation({
    mutationFn: async (share: boolean) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('profiles')
        .update({ share_inventory: share })
        .eq('id', user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: "Settings updated",
        description: "Your sharing preferences have been updated.",
      });
    },
  });

  // Invite roommate
  const inviteMutation = useMutation({
    mutationFn: async (email: string) => {
      if (!user) throw new Error('User not authenticated');
      
      // First find the user by email (since we're using email as username in profiles)
      const { data: invitedUser, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', email)
        .single();
      
      if (userError) throw new Error('User not found');
      
      // Check if connection already exists
      const { data: existingConnection } = await supabase
        .from('roommate_connections')
        .select('id')
        .eq('user_id', user.id)
        .eq('roommate_id', invitedUser.id)
        .maybeSingle();
        
      if (existingConnection) throw new Error('Invitation already sent');
      
      // Create the connection
      const { error } = await supabase
        .from('roommate_connections')
        .insert({
          user_id: user.id,
          roommate_id: invitedUser.id,
          status: 'pending'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roommates'] });
      setInviteEmail('');
      toast({
        title: "Invitation sent",
        description: "We've sent an invitation to your roommate.",
      });
    },
    onError: (error) => {
      toast({
        title: "Invitation failed",
        description: error instanceof Error ? error.message : "Failed to send invitation",
        variant: "destructive",
      });
    }
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail) {
      inviteMutation.mutate(inviteEmail);
    }
  };

  return (
    <AppLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Share</h1>
          <p className="text-gray-500">Manage shared items with roommates</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-medium mb-4">Fridge Sharing</h2>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="share-inventory">Share inventory</Label>
              <Switch
                id="share-inventory"
                checked={profile?.share_inventory || false}
                onCheckedChange={(checked) => toggleShareMutation.mutate(checked)}
              />
            </div>
          </div>
          
          {profile?.share_inventory && (
            <>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h2 className="font-medium mb-4">Invite New Roommate</h2>
                
                <form onSubmit={handleInvite} className="flex gap-2">
                  <Input 
                    placeholder="Email address" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <Button 
                    className="bg-fridgely-green hover:bg-fridgely-green/90 gap-2"
                    disabled={inviteMutation.isPending}
                  >
                    <Share size={16} />
                    {inviteMutation.isPending ? 'Sending...' : 'Invite'}
                  </Button>
                </form>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h2 className="font-medium mb-4">Active Connections</h2>
                
                <div className="space-y-4">
                  {roommates && roommates.map((connection) => (
                    <div key={connection.id} className="flex items-center gap-3 p-3 bg-fridgely-lightGray rounded-lg">
                      <img
                        src={connection.roommate.avatar_url || "https://source.unsplash.com/random/100x100/?person"}
                        alt={connection.roommate.username}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{connection.roommate.username}</p>
                      </div>
                      <div className="ml-auto">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          connection.status === 'accepted' 
                            ? 'bg-fridgely-green text-white' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {connection.status === 'accepted' ? 'Active' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}

                  {roommates && roommates.length === 0 && (
                    <p className="text-center text-gray-500">No active connections yet</p>
                  )}
                  
                  {roommatesLoading && (
                    <p className="text-center text-gray-500">Loading connections...</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Roommates;
