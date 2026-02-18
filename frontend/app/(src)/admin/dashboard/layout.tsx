import { AuthProvider } from "../context/AuthProvider";
import { getAuthCookies } from "../cookies/getAuthCookies";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuthCookies();
  if (!auth) redirect("/login");

  return (
    <>
      <AuthProvider auth={auth}>{children}</AuthProvider>
    </>
  );
}
