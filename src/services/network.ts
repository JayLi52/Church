import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { create } from 'zustand';

interface NetworkStore {
    isConnected: boolean;
    type: string | null;
    setNetworkState: (state: NetInfoState) => void;
}

export const useNetworkStore = create<NetworkStore>(set => ({
    isConnected: true,
    type: null,
    setNetworkState: (state: NetInfoState) =>
        set({
            isConnected: state.isConnected ?? false,
            type: state.type,
        }),
}));

export const initNetworkMonitoring = () => {
    return NetInfo.addEventListener(state => {
        useNetworkStore.getState().setNetworkState(state);
    });
}; 