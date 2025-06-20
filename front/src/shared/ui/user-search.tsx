'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Search, Check, X, Loader2, Users } from 'lucide-react';
import { useSearchUsersByEmail } from '@/entities/user/model/queries';

interface User {
  id: number | string;
  email: string;
  name?: string;
  isEmailVerified?: boolean;
  profilePicture?: string;
  avatar?: string;
  role?: string;
}

interface UserSearchProps {
  onUserSelect: (user: User) => void;
  selectedUser?: User | null;
  clearSelectedUser?: () => void;
  className?: string;
  label?: string;
  placeholder?: string;
}

export function UserSearch({
  onUserSelect,
  selectedUser,
  clearSelectedUser,
  className = '',
  label = 'Поиск пользователя',
  placeholder = 'Введите email для поиска...',
}: UserSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { data: users, isLoading: isSearching } =
    useSearchUsersByEmail(searchQuery);

  useEffect(() => {
    setShowResults(searchQuery.length > 0);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleUserSelect = (user: User) => {
    onUserSelect(user);
    setSearchQuery('');
    setShowResults(false);
  };

  const getInitials = (user: User) => {
    if (user.avatar) return user.avatar;
    if (user.name)
      return (
        user.name.charAt(0).toUpperCase() +
        (user.name.split(' ')[1]?.charAt(0).toUpperCase() || '')
      );
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <Label htmlFor="email" className="text-sm font-medium">
          {label}
        </Label>
      )}

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
        <Input
          id="email"
          type="email"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          className="pl-12 pr-12 h-12 transition-all duration-200"
        />
        {isSearching && (
          <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Результаты поиска */}
      {showResults && (
        <div className="mt-2 border rounded-lg bg-card shadow-lg overflow-hidden">
          <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
            {isSearching ? (
              <div className="p-8 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Поиск пользователей...
                  </p>
                </div>
              </div>
            ) : users && users.length > 0 ? (
              <div className="py-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="group flex items-center space-x-4 px-6 py-4 hover:bg-muted/50 cursor-pointer transition-all duration-200 border-b last:border-b-0"
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm group-hover:ring-muted-foreground/20 transition-all duration-200">
                        <AvatarImage
                          src={user.profilePicture || '/placeholder.svg'}
                          alt={user.email}
                        />
                        <AvatarFallback className="text-sm font-medium">
                          {getInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                      {user.isEmailVerified && (
                        <div className="absolute -bottom-1 -right-1 p-0.5 bg-background rounded-full border">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-foreground transition-colors">
                        {user.email || user.email}
                      </p>
                      {user.email && (
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      )}
                      {user.isEmailVerified && (
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs">
                            {user.profilePicture}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery.length > 0 ? (
              <div className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 rounded-full bg-muted">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Пользователи не найдены
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Попробуйте изменить поисковый запрос
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Выбранный пользователь */}
      {selectedUser && !showResults && clearSelectedUser && (
        <div className="mt-4 p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm">
                <AvatarImage
                  src={selectedUser.profilePicture || '/placeholder.svg'}
                  alt={selectedUser.email}
                />
                <AvatarFallback className="text-sm font-medium">
                  {getInitials(selectedUser)}
                </AvatarFallback>
              </Avatar>
              {selectedUser.isEmailVerified && (
                <div className="absolute -bottom-1 -right-1 p-0.5 bg-background rounded-full border">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {selectedUser.name || selectedUser.email}
              </p>
              {selectedUser.name && (
                <p className="text-xs text-muted-foreground">
                  {selectedUser.email}
                </p>
              )}
              {selectedUser.role && (
                <div className="mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {selectedUser.role}
                  </Badge>
                </div>
              )}
            </div>

            <button
              type="button"
              className="h-8 w-8 p-0 flex items-center justify-center rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={clearSelectedUser}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

