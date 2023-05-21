import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/assets/lib/api'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/f28fac4defd7bfa7e123',
}

export default function App() {
  const router = useRouter()

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'f28fac4defd7bfa7e123',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    // console.log(
    //   'response',
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2 ">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Your time machine
          </Text>

          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Save your memorable moments and (maybe) share them with the world!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Save a memory
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Made with 💜 on NLW by Rocketseat
      </Text>
    </View>
  )
}
