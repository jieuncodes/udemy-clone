import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Component {...pageProps} />
    </div>
  );
}
