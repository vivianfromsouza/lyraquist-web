export type ThemeColors = {
  backgroundColor?: string;
  marginTop?: number;
  marginBottom: number;
  shadowColor: string;
  borderWidth?: number;
  borderColor?: string;
};

export const whiteTheme: ThemeColors = {
  backgroundColor: "#e8e1db",
  marginTop: 8,
  marginBottom: 12,
  shadowColor: "#303248",
};

export const lineTheme: ThemeColors = {
  borderWidth: 1,
  borderColor: "#303248",
  shadowColor: "#320829",
  marginBottom: 32,
};
