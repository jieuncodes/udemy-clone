export async function getServerSideProps(context) {
    const { user } = await supabase.auth.api.getUserByCookie(context.req);
  
    if (!user) {
      return {
        redirect: {
          destination: '/enter',
          permanent: false,
        },
      };
    }
  
    const { data, error } = await supabase
      .from('user_profile')
      .select('username')
      .eq('id', user.id)
      .single();
    console.log('SSP DATA', data);
    if (error) {
      console.error(error);
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        username: data.username,
      },
    };
  }
  