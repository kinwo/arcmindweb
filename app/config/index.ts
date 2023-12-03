export enum AuthProvider {
  // eslint-disable-next-line no-unused-vars
  NFID = 'NFID',
}

export const OneSecInNano = BigInt(1000000000);
export const OneHourInNano = BigInt(3600000000000);
export const OneDayInNano = BigInt(24) * OneHourInNano;

// 7 days session duration and idle timeout
export const AuthConfig = {
  MaxSessionDurationNanoSecs: BigInt(30) * OneDayInNano,
  CheckInterval: 60 * 1000,
};

export const SWRKey = {
  Chat: '/api/chathistory/',
};
