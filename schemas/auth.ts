import { z } from "zod";

const email = z.string().email("有効なメールアドレスを入力してください");
const name = z.string().min(6, "名前を入力してください");
const password = z.string().min(8, "パスワードは8文字以上で入力してください");

export const signInSchema = z.object({
  email,
  password,
});

export const signUpSchema = z
  .object({
    name,
    email,
    password,
    confirmPassword: password.optional().or(z.literal("")),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "パスワードが一致しません",
      path: ["confirmPassword"],
    },
  );

// パスワードリセットスキーマ
export const resetPasswordSchema = z.object({
  email,
});

// パスワード変更スキーマ
export const changePasswordSchema = z
  .object({
    currentPassword: password,
    newPassword: password,
    confirmNewPassword: password,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "新しいパスワードが一致しません",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "新しいパスワードは現在のパスワードと異なるものを設定してください",
    path: ["newPassword"],
  });

// プロフィール更新スキーマ
export const updateProfileSchema = z.object({
  name,
  email,
  // 他のプロフィールフィールド
  bio: z
    .string()
    .max(160, "自己紹介は160文字以内で入力してください")
    .optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
