type AppPageLayoutProps = {
  children?: React.ReactNode
}

const AppPageLayout = ({ children }: AppPageLayoutProps) => {
  return <div className="p-8 h-screen bg-blue-200">{children}</div>
}

export default AppPageLayout
