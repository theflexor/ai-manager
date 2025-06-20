'use client';

import * as z from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useSubscriptionById,
  useSubscriptionUpdate,
} from '@/entities/subscription/model/queries';
import { useEffect } from 'react';

const formSchema = z
  .object({
    serviceName: z.string().min(2, {
      message: 'Service name must be at least 2 characters.',
    }),
    price: z.number().min(0, {
      message: 'Price must be a positive number.',
    }),
    currency: z.string().min(2, {
      message: 'Currency must be at least 2 characters.',
    }),
    description: z.string().optional(),
    startsAt: z.string().min(1, {
      message: 'Start date is required.',
    }),
    expiresAt: z.string().min(1, {
      message: 'Expiry date is required.',
    }),
    type: z.enum(['personal', 'group', 'trial'], {
      required_error: 'Please select a subscription type.',
    }),
  })
  .refine((data) => new Date(data.expiresAt) > new Date(data.startsAt), {
    message: 'Expiry date must be after start date.',
    path: ['expiresAt'],
  });

interface AddSubscriptionButtonProps {
  isOpen: boolean;
  close: () => void;
  subscriptionId: number;
  setIsOpen?: (isOpen: boolean) => void;
}

export function AddSubscriptionModal({
  subscriptionId,
  close,
  isOpen: open,
  setIsOpen,
}: AddSubscriptionButtonProps) {
  const { data, isLoading } = useSubscriptionById(subscriptionId);
  const { mutate } = useSubscriptionUpdate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: '',
      price: 0,
      currency: 'USD',
      description: '',
      startsAt: new Date().toISOString().split('T')[0], // Today in YYYY-MM-DD format
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // 30 days from now
      type: 'personal',
    },
  });

  useEffect(() => {
    if (data && !isLoading) {
      form.reset({
        serviceName: data.serviceName,
        price: Number(data.price),
        currency: data.currency,
        description: data.description || '',
        startsAt: new Date(data.startsAt).toISOString().split('T')[0],
        expiresAt: new Date(data.expiresAt).toISOString().split('T')[0],
        type: data.type,
      });
    }
  }, [data, isLoading, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitting form with values:', values);

    // Convert string dates to ISO format for API
    const payload = {
      ...values,
      startsAt: new Date(values.startsAt).toISOString(),
      expiresAt: new Date(values.expiresAt).toISOString(),
    };

    mutate({ id: subscriptionId + '', data: payload });

    toast.success('Subscription added', {
      description: `${values.serviceName} has been added to your subscriptions.`,
    });

    close();
    form.reset({
      serviceName: '',
      price: 0,
      currency: 'USD',
      description: '',
      startsAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      type: 'personal',
    });
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>
            Add a new subscription to your account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ChatGPT Plus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="20"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder="USD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Subscription description..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startsAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        min={
                          form.watch('startsAt') ||
                          new Date().toISOString().split('T')[0]
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subscription type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

