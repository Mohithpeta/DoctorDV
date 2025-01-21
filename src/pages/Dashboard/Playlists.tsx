import { Plus, MoreVertical, Play } from 'lucide-react';

interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  videoCount: number;
  lastUpdated: string;
}

interface PlaylistsProps {
  playlists: Playlist[];
  onCreatePlaylist: () => void;
  onEditPlaylist: (id: string) => void;
  onDeletePlaylist: (id: string) => void;
  onPlayPlaylist: (id: string) => void;
}

export function Playlists({
  playlists,
  onCreatePlaylist,
  onEditPlaylist,
  onDeletePlaylist,
  onPlayPlaylist,
}: PlaylistsProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Playlists</h2>
        <button
          onClick={onCreatePlaylist}
          className="flex items-center px-4 py-2 bg-[#A32E76] text-white rounded-lg hover:bg-[#8E2968] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative group">
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => onPlayPlaylist(playlist.id)}
                  className="bg-white/90 text-[#A32E76] px-4 py-2 rounded-full text-sm font-medium flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play All
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{playlist.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {playlist.videoCount} videos
                  </p>
                </div>
                <div className="relative group">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 hidden group-hover:block">
                    <button
                      onClick={() => onEditPlaylist(playlist.id)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Edit Playlist
                    </button>
                    <button
                      onClick={() => onDeletePlaylist(playlist.id)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Delete Playlist
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Last updated {playlist.lastUpdated}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
