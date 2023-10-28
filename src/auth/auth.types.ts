export type JwtUserPayload = {
  id: string;
  email: string;
};

export type GoogleUser = {
  firstName: string;
  lastName: string;
  email: string;
  sub_id: string;
  accessToken: string;
};
