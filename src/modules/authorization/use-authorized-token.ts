import {useAppBridge} from "@saleor/app-sdk/app-bridge";
import {useEffect, useState} from "react";
import * as jose from 'jose'

export function useAuthorizedToken(requirePermission: string) {
    const [authorized, setAuthorized] = useState<boolean | undefined>()

    const {appBridgeState} = useAppBridge()

    useEffect(() => {
        if(appBridgeState?.token) {
            const decodedToken = jose.decodeJwt(appBridgeState.token);

            console.log(decodedToken)
        }
    }, [appBridgeState])

    return authorized
}