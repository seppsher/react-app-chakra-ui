'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Accordion,
  Box,
  Button,
  Checkbox,
  CloseButton,
  createListCollection,
  Dialog,
  Field,
  FileUpload,
  HStack,
  Icon,
  Input,
  NumberInput,
  Portal,
  RadioGroup,
  Select,
  Switch,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { useTranslation } from 'react-i18next';
import { LuUpload } from 'react-icons/lu';
import { Routes } from '@/enums/Routes';
import { useRouter } from 'next/navigation';

export const Form = () => {
  type FormData = z.infer<typeof formSchema>;

  const { t } = useTranslation();

  const formSchema = z.object({
    username: z
      .string()
      .min(3, t('validations.required'))
      .max(20, t('validations.maxLength')),
    framework: z.string({ message: t('validations.required') }).array(),
    checkbox: z.boolean().refine((value) => value === true, {
      message: t('validations.checkbox.error'),
    }),
    switch: z.boolean().refine((value) => value === true, {
      message: t('validations.switch.error'),
    }),
    number: z.number().gte(10),
    textarea: z.string().max(10, t('validations.maxLength')).optional(),
    radio: z.string().refine((value) => value != null, {
      message: t('validations.required'),
    }),
    files: z.array(z.instanceof(File)).min(1, t('validations.required')),
  });

  const form = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: 10,
    },
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const frameworks = createListCollection({
    items: [
      { label: 'React.js', value: 'react' },
      { label: 'Vue.js', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
    ],
  });

  const onSubmit = () => {
    toaster.create({
      description: t('form.submit.success'),
      type: 'success',
    });
  };

  const radioItems = [
    { label: 'Value 1', value: 'value1' },
    { label: 'Value 2', value: 'value2' },
    { label: 'Value 3', value: 'value3' },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={6} align="stretch" width={600} m="0 auto">
          <Field.Root invalid={!!errors.username}>
            <Field.Label>{t('form.username.label')}</Field.Label>
            <Input
              {...register('username')}
              placeholder={t('form.username.placeholder')}
            />
            {errors.username && (
              <Field.ErrorText>{errors.username.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.framework}>
            <Field.Label>{t('form.framework.label')}</Field.Label>
            <Controller
              control={control}
              name="framework"
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={frameworks}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {frameworks.items.map((framework) => (
                          <Select.Item item={framework} key={framework.value}>
                            {framework.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            <Field.ErrorText>{errors.framework?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.checkbox}>
            <Controller
              control={control}
              name="checkbox"
              render={({ field }) => (
                <Checkbox.Root
                  invalid={!!errors.checkbox}
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                  variant="outline"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>{t('form.checkbox.label')}</Checkbox.Label>
                </Checkbox.Root>
              )}
            ></Controller>

            <Field.ErrorText>{errors.checkbox?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.switch}>
            <Controller
              control={control}
              name="switch"
              render={({ field }) => (
                <Switch.Root
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>{t('form.switch.label')}</Switch.Label>
                </Switch.Root>
              )}
            ></Controller>

            <Field.ErrorText>{errors.switch?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.textarea}>
            <Textarea
              variant="subtle"
              placeholder="Tralalala"
              {...register('textarea')}
            />
            <Field.ErrorText>{errors.textarea?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.number}>
            <Field.Label>{t('form.number.label')}</Field.Label>

            <NumberInput.Root>
              <NumberInput.Control />
              <NumberInput.Input
                {...register('number', { valueAsNumber: true })}
              />
            </NumberInput.Root>
            <Field.ErrorText>{errors.number?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.radio}>
            <Field.Label>{t('form.radio.label')}</Field.Label>
            <Controller
              name="radio"
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  key="solid"
                  variant="solid"
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value);
                  }}
                >
                  <HStack gap="6">
                    {radioItems.map((item) => (
                      <RadioGroup.Item key={item.value} value={item.value}>
                        <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>
              )}
            />
            <Field.ErrorText>{errors.radio?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.files}>
            <Field.Label>{t('form.files.label')}</Field.Label>

            <Controller
              name="files"
              control={control}
              render={() => (
                <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10}>
                  <FileUpload.HiddenInput />
                  <FileUpload.Dropzone>
                    <Icon size="md" color="fg.muted">
                      <LuUpload />
                    </Icon>
                    <FileUpload.DropzoneContent>
                      <Box>{t('form.files.dragAndDrop')}</Box>
                      <Box color="fg.muted">{t('form.files.extensions')}</Box>
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                  <FileUpload.List />

                  <FileUpload.ClearTrigger asChild>
                    <CloseButton
                      me="-1"
                      size="xs"
                      variant="plain"
                      focusVisibleRing="inside"
                      focusRingWidth="2px"
                      pointerEvents="auto"
                    />
                  </FileUpload.ClearTrigger>
                </FileUpload.Root>
              )}
            />

            <Field.ErrorText>{errors.files?.message}</Field.ErrorText>
          </Field.Root>

          <Accordion.Root collapsible defaultValue={['b']}>
            <Accordion.Item value="a">
              <Accordion.ItemTrigger>
                <h1>{t('form.accordion.header')}</h1>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <div>{t('form.accordion.body')}</div>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button variant="outline" size="sm">
                        {t('form.accordion.button.label')}
                      </Button>
                    </Dialog.Trigger>

                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Context>
                            {(store) => (
                              <Dialog.Body pt="6" spaceY="3">
                                <p>
                                  {t('form.dialog.header', {
                                    id: store.open ? 'true' : 'false',
                                  })}
                                </p>
                                <p>{t('form.dialog.body')}</p>
                              </Dialog.Body>
                            )}
                          </Dialog.Context>

                          <Dialog.Footer>
                            <Button
                              colorPalette="red"
                              onClick={() => {
                                router.push(Routes.About);
                              }}
                            >
                              {t('form.dialog.button.cancel.label')}
                            </Button>

                            <Dialog.ActionTrigger asChild>
                              <Button colorPalette="green">
                                {t('form.dialog.button.confirm.label')}
                              </Button>
                            </Dialog.ActionTrigger>
                          </Dialog.Footer>

                          <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                          </Dialog.CloseTrigger>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>

          <Button onClick={handleSubmit(onSubmit)}>
            {t('form.button.label')}
          </Button>
        </VStack>
      </form>
    </>
  );
};
