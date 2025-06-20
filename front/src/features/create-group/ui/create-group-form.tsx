'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/ui/card';
import { Plus, Users } from 'lucide-react';
import { GroupNameField } from './group-name-field';
import { MembersSection } from './members-section';
import { Button } from '@/shared/ui/button';
import { useCreateGroup } from '../model/use-create-group';

export function CreateGroupForm() {
  const { form, fields, isSubmitting, onSubmit, addMember, removeMember } =
    useCreateGroup();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const watchedMemberIds = watch('memberIds') || [];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-1xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Создать новую группу</h1>
          <p className="text-muted-foreground">
            Заполните информацию для создания группы и добавьте участников
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Информация о группе
            </CardTitle>
            <CardDescription>
              Введите название группы и добавьте участников
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <GroupNameField register={register} errors={errors} />

              <MembersSection
                fields={fields}
                register={register}
                addMember={addMember}
                removeMember={removeMember}
                watchedMemberIds={watchedMemberIds}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Создание группы...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Создать группу
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

