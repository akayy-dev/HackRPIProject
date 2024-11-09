from gpt import OpenAIClient
from os import getenv

fake_input = "Trattoria Bella Napoli, nestled at 145 Via Roma in the heart of Florence, Italy, has been serving authentic Italian cuisine since 1998. Owned by Marco Esposito and helmed by Chef Isabella Ricci, this charming trattoria offers a cozy, rustic ambiance with wooden tables, checkered red-and-white tablecloths, and vintage photographs of Naples and the Amalfi Coast adorning the walls. Soft Italian music completes the warm atmosphere, creating a delightful setting for enjoying traditional dishes. Signature offerings include the 'Pasta al Tartufo,' a handmade fettuccine with rich black truffle sauce, and the Osso Buco alla Milanese, a tender braised veal shank over saffron risotto. Other favorites include Bruschetta alla Caprese, Arancini Siciliani, and the seafood-packed Risotto ai Frutti di Mare. For dessert, guests rave about the homemade Tiramisu della Casa and Cannoli Siciliani. With an average price range of €20-€45 per person, the restaurant has earned glowing reviews for its friendly service and unforgettable dishes. You can find Trattoria Bella Napoli on Instagram @TrattoriaBellaNapoli, Facebook, and online at www.trattoriabellanapoli.it, where it is celebrated as a hidden gem bringing an authentic slice of Italy to locals and travelers alike."

api_key = getenv("OPENAI_KEY")

asst_key = "asst_htakfV60aT4R0yLeDuoI87zF"

client = OpenAIClient(api_key, asst_key)
response = client.get_summary(fake_input)
print(response)