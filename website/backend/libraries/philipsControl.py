import asyncio
from hue import Bridge, Light
from Database import Database


class PhilipsControl:
    def __init__(self):
        self.bridge = Bridge(ip='192.168.1.165',
                             user='V1Mf-5ElO24L91YFigyb62iEeqTAJVspcGuYGln-')
        self.info = asyncio.run(self.bridge.get_info())
        self.lights = self.create_lights()

    def create_lights(self):
        lights = []
        for light in self.info['lights']:
            lights.append(Light(light, ip='192.168.1.165',
                                user='V1Mf-5ElO24L91YFigyb62iEeqTAJVspcGuYGln-'))
            try:
                db = Database('../database.db')
                db.execute('INSERT INTO Light (Id, Name, RoomId) VALUES (?, ?, ?)', [
                           light, self.info['lights'][light]['name'], 0])

            except Exception as e:
                pass

        return lights

    def on(self, light_id):
        asyncio.run(self.lights[light_id].power_on())

    def off(self, light_id):
        asyncio.run(self.lights[light_id].power_off())

    def brightness(self, light_id, brightness):
        if brightness == 0:
            self.off(light_id)
        else:
            lum = self.info['lights'][f'{light_id + 1}']['capabilities']['control']['maxlumen']

            if brightness > lum:
                raise ValueError('Brightness is too high')
            else:
                brightness = brightness / lum
                print(brightness)
                brightness = int(brightness * 254)
                print(brightness)

                asyncio.run(self.lights[light_id].set_state(
                    {'on': True, 'bri': brightness}))


if __name__ == '__main__':
    philips = PhilipsControl()
    philips.brightness(0, 806)
    philips.brightness(1, 806)

# * detect bridge
# * find lights
# * initialize lights
# * turn lights on
# * turn lights off
# * change brightness of lights
# * lights in the database
# TODO front end so user can assign a light to a room
# TODO calculations for the lights
