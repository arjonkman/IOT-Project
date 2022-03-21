import random


def temperature(start=21, len=50):
    temps = []
    temps.append(start)
    for _ in range(len):
        min = random.randint(0, 2)
        max = random.randint(0, 2)
        temp = random.randint(start-min, start+max)
        temps.append(temp)
    return temps


def main():
    temps = temperature(21, 10000)
    with open('temperature.csv', 'w') as file:
        array_len = len(temps)
        current_len = 0
        for temp in temps:
            current_len += 1
            file.write(f'{temp},') if array_len != current_len else file.write(
                f'{temp}')


if __name__ == '__main__':
    # main()
    data = ''
    with open('temperature.csv', 'r') as file:
        data = file.readlines()
    data = data[0].split(',')
    print(data)
