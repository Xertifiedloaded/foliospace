import React, { useState } from 'react';
import { Copy, Check, Heart, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '../../../hooks/use-toast';

const CryptoDonation = () => {
  const [copiedAddress, setCopiedAddress] = useState('');

  const walletAddresses = {
    eth: {
      address: '0x42F66D933Af2b57339ee28A787cc10a5f88738EB',
      network: 'Erc 20/Bep20'
    },
    btc: {
      address: 'bc1qh9ylh5nan2k2vreqxramfh272psu3sry80mzp2',
      network: 'Bitcoin Network'
    },
    sol: {
      address: 'D57cQ1Ms5FB3f16wdxAiPHUYmoZg9vRvkFmyJDyqwJbB',
      network: 'Solana Network'

    }
  };

  const handleCopy = async (address, type) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(type);
      toast({
        title: "Address copied!",
        description: "The wallet address has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the address manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full  flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl">
              <Heart className="w-8 h-8 text-red-500" />
              Support My Work
            </CardTitle>
            <CardDescription className="text-lg">
              Your donations help me continue creating and sharing valuable content.
              Every contribution makes a difference!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs defaultValue="eth" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="eth">Ethereum</TabsTrigger>
                <TabsTrigger value="btc">Bitcoin</TabsTrigger>
                <TabsTrigger value="sol">Solana</TabsTrigger>
              </TabsList>
              
              {Object.entries(walletAddresses).map(([crypto, details]) => (
                <TabsContent key={crypto} value={crypto} className="space-y-4">
                  <Alert className="relative">
                    <AlertDescription className="font-mono overflow-x-hidden text-sm pr-24">
                      {details.address}
                    </AlertDescription>
                    <Button 
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      variant="default"
                      size="sm"
                      onClick={() => handleCopy(details.address, crypto)}
                    >
                      {copiedAddress === crypto ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </Alert>
                  <p className="text-sm text-slate-500 text-center">
                    Network: {details.network}
                  </p>
                </TabsContent>
              ))}
            </Tabs>

            <div className="bg-slate-100 rounded-lg p-6 space-y-4">
              <h3 className="font-medium text-black text-lg">How to Donate:</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>Choose your preferred cryptocurrency above and copy the wallet address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Open your cryptocurrency wallet application or exchange</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>Make sure you're on the correct network before sending</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <span>Send your desired amount to the provided address</span>
                </li>
              </ol>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 text-center text-sm text-slate-500">
            <p>Thank you for your support! ❤️</p>
            <div className="flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Transactions may take a few minutes to process</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CryptoDonation;