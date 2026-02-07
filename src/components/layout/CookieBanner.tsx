'use client';

export function CookieBanner() {
  console.log('[CookieBanner] COMPONENT IS LOADING!!!');

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'red',
        color: 'white',
        padding: '20px',
        zIndex: 9999,
        fontSize: '20px',
        textAlign: 'center'
      }}
    >
      COOKIE BANNER TEST - Si ves esto, el componente funciona
    </div>
  );
}
