'use client';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Plus, X, Users } from 'lucide-react';
import type { UseFormRegister, FieldArrayWithId } from 'react-hook-form';
import { Badge } from '@/shared/ui/badge';
import { CreateGroupFormData } from '../model/create-group.validation';

interface MembersSectionProps {
  fields: FieldArrayWithId<CreateGroupFormData, 'memberIds', 'id'>[];
  register: UseFormRegister<CreateGroupFormData>;
  addMember: () => void;
  removeMember: (index: number) => void;
  watchedMemberIds: string[];
}

export function MembersSection({
  fields,
  register,
  addMember,
  removeMember,
  watchedMemberIds,
}: MembersSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Участники группы</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addMember}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Добавить участника
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Участники не добавлены</p>
          <p className="text-sm">
            Нажмите "Добавить участника" чтобы добавить пользователей
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-3 p-3 border rounded-lg"
            >
              <div className="flex-1">
                <Label htmlFor={`memberIds.${index}`} className="text-sm">
                  ID участника #{index + 1}
                </Label>
                <Input
                  id={`memberIds.${index}`}
                  type="number"
                  placeholder="Введите ID пользователя"
                  {...register(`memberIds.${index}` as const, {
                    valueAsNumber: true,
                  })}
                  className="mt-1"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeMember(index)}
                className="hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {watchedMemberIds.length > 0 && (
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium mb-2">
            Добавлено участников: {watchedMemberIds.length}
          </p>
          <div className="flex flex-wrap gap-1">
            {watchedMemberIds.map((id, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                ID: {id || 'не указан'}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

