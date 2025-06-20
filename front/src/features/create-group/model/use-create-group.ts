'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateGroupFormData,
  createGroupSchema,
} from './create-group.validation';

export function useCreateGroup() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      ownerId: 1, // Получать из контекста текущего пользователя
      memberIds: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'memberIds',
  });

  const onSubmit = async (data: CreateGroupFormData) => {
    setIsSubmitting(true);
    try {
      //   const createGroupDto: CreateGroupDto = {
      //     name: data.name,
      //     ownerId: data.ownerId,
      //     memberIds: data.memberIds,
      //   }

      //   await groupApi.createGroup(createGroupDto)
      form.reset();
      alert('Группа успешно создана!');
    } catch (error) {
      console.error('Ошибка при создании группы:', error);
      alert('Произошла ошибка при создании группы');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addMember = () => {
    append(0);
  };

  const removeMember = (index: number) => {
    remove(index);
  };

  return {
    form,
    fields,
    isSubmitting,
    onSubmit,
    addMember,
    removeMember,
  };
}

