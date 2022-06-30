import asyncio
import datetime
from hue import Bridge, Light
# from Database import Database


class PhilipsControl:
    def __init__(self, db):
        self.bridge = Bridge(ip='192.168.1.165',
                             user='V1Mf-5ElO24L91YFigyb62iEeqTAJVspcGuYGln-')
        self.info = asyncio.run(self.bridge.get_info())
        self.db = db
        self.lights = self.create_lights()

    def create_lights(self):
        lights = []
        for light in self.info['lights']:
            lights.append(Light(light, ip='192.168.1.165',
                                user='V1Mf-5ElO24L91YFigyb62iEeqTAJVspcGuYGln-'))
            try:
                self.db.execute('INSERT INTO Light (Id, Name, RoomId) VALUES (?, ?, ?)', [
                    light, self.info['lights'][light]['name'], 0])

            except Exception as e:
                pass

        return lights

    def on(self, light_id):
        asyncio.run(self.lights[light_id].power_on())

    def off(self, light_id):
        asyncio.run(self.lights[light_id].power_off())

    def brightness(self, light_id, brightness):

        lm_pw = 80
        lum = brightness
        watt = lum / lm_pw

        now = datetime.datetime.now()
        nowutc = datetime.datetime.strftime(
            now, r'%Y-%m-%dT%H:%M:%SZ Amsterdam')
        try:
            current_watt = self.db.execute(
                'SELECT Data FROM LightData WHERE LightId = ? ORDER BY Date DESC LIMIT 1', [light_id+1])[0][0]
        except:
            current_watt = -1

        if current_watt != watt:
            self.db.execute('INSERT INTO LightData (LightId, Data, Date) VALUES (?, ?, ?)', [
                light_id+1, watt, nowutc])

        if brightness == 0:
            self.off(light_id)
        else:
            lum = self.info['lights'][f'{light_id + 1}']['capabilities']['control']['maxlumen']

            if brightness > lum:
                raise ValueError('Brightness is too high')
            else:
                if self.info['lights'][f'{light_id + 1}']['state']['on'] == False:
                    self.on(light_id)
                brightness = brightness / lum
                brightness = int(brightness * 254)

                asyncio.run(self.lights[light_id].set_state(
                    {'on': True, 'bri': brightness}))

    def calculate_total_power(self, light_id):
        total = 0
        data = self.db.execute(
            'SELECT Data, Date FROM LightData WHERE LightId = ?', [light_id])

        for i in range(len(data)):
            if i != len(data)-1:
                past = data[i][1]
                current = data[i+1][1]

                # convert to datetime object
                past = datetime.datetime.strptime(
                    past, r'%Y-%m-%dT%H:%M:%SZ Amsterdam')
                current = datetime.datetime.strptime(
                    current, r'%Y-%m-%dT%H:%M:%SZ Amsterdam')

                difference = current - past

                wattUsage = (data[i][0]*difference.total_seconds())/3600
                total += wattUsage

            else:
                past = data[i][1]
                current = datetime.datetime.now()

                # convert to datetime object
                past = datetime.datetime.strptime(
                    past, r'%Y-%m-%dT%H:%M:%SZ Amsterdam')

                difference = current - past

                wattUsage = (data[i][0]*difference.total_seconds())/3600
                total += wattUsage

        return total

    def wattage(self):
        L = 0
        for i in range(len(self.lights)):
            L += self.calculate_total_power(i)
        return L

    def max_wattage(self):
        max = {}
        total = 0
        for i in range(len(self.lights)):
            lum = self.info['lights'][f'{i+1}']['capabilities']['control']['maxlumen']

            lm_pw = 80
            watt = lum / lm_pw
            max[i] = watt

            max[f'{i}data'] = self.db.execute(
                'SELECT Data, Date FROM LightData WHERE LightId = ?', [i+1])

        for i in range(len(self.lights)):

            for id in range(len(max[f'{i}data'])):
                if id != len(max[f'{i}data'])-1:
                    if max[f'{i}data'][id][0] != 0:
                        past = max[f'{i}data'][id][1]
                        current = max[f'{i}data'][id+1][1]

                        # convert to datetime object
                        past = datetime.datetime.strptime(
                            past, r'%Y-%m-%dT%H:%M:%SZ Amsterdam')
                        current = datetime.datetime.strptime(
                            current, r'%Y-%m-%dT%H:%M:%SZ Amsterdam')

                        difference = current - past

                        wattUsage = (
                            max[i]*difference.total_seconds())/3600

                        total += wattUsage

                else:
                    if max[f'{i}data'][id][0] != 0:
                        past = max[f'{i}data'][id][1]
                        current = datetime.datetime.now()

                        # convert to datetime object
                        past = datetime.datetime.strptime(
                            past, r'%Y-%m-%dT%H:%M:%SZ Amsterdam')

                        difference = current - past

                        wattUsage = (
                            max[i]*difference.total_seconds())/3600

                        total += wattUsage
        return total


if __name__ == '__main__':
    # philips = PhilipsControl(Database('../database.db'))
    # philips.brightness(0, 500)
    # philips.brightness(1, 500)
    pass
    # * detect bridge
    # * find lights
    # * initialize lights
    # * turn lights on
    # * turn lights off
    # * change brightness of lights
    # * lights in the database
    # * front end so user can assign a light to a room
    # * calculations for the lights
