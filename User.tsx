import React, { useEffect, useState } from 'react';
import { useRequest } from '@umijs/hooks';

function getUserInfo(id: number) {
  return {
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'GET',
    params: {
      id,
    },
  };
}

const User: React.FC = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { run, loading } = useRequest(getUserInfo, {
    manual: true,
    // pollingInterval: 3000,
    onSuccess: (result, params) => {
      console.log(result, params); // false hello world
      const [userInfo] = result;
      setUserInfo(userInfo);
    },
  });
  useEffect(() => {
    run(5, false, 'hello world');
  }, []);
  if (loading) return <div>loading...</div>;
  return (
    <div>
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
    </div>
  );
};

export default User;
