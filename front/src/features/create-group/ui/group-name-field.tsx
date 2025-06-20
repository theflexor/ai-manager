import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CreateGroupFormData } from '../model/create-group.validation';

interface GroupNameFieldProps {
  register: UseFormRegister<CreateGroupFormData>;
  errors: FieldErrors<CreateGroupFormData>;
}

export function GroupNameField({ register, errors }: GroupNameFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Название группы *</Label>
      <Input
        id="name"
        placeholder="Введите название группы"
        {...register('name')}
        className={
          errors.name ? 'border-destructive focus-visible:ring-destructive' : ''
        }
      />
      {errors.name && (
        <p className="text-sm text-destructive">{errors.name.message}</p>
      )}
    </div>
  );
}

