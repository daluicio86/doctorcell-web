"""Original 128 BPM electronic instrumental for the 15-second DoctorCell spot."""
from pathlib import Path
import wave
import numpy as np
SR = 48000
DURATION = 15
BEAT = 60 / 128
rng = np.random.default_rng(2407)
mix = np.zeros((SR * DURATION, 2), dtype=np.float64)

def add(signal, start, gain=1.0, pan=0.0):
    offset = round(start * SR)
    if offset >= len(mix): return
    signal = signal[:len(mix) - offset] * gain
    mix[offset:offset+len(signal), 0] += signal * np.sqrt((1-pan)/2)
    mix[offset:offset+len(signal), 1] += signal * np.sqrt((1+pan)/2)

def tone(midi, duration, kind='pluck'):
    t = np.arange(round(duration * SR)) / SR
    hz = 440 * 2 ** ((midi-69)/12)
    if kind == 'bass':
        sound = np.sin(2*np.pi*hz*t) + .22*np.sin(4*np.pi*hz*t) + .08*np.sin(6*np.pi*hz*t)
        env = np.minimum(t/.008, 1)*np.exp(-t*5)*np.minimum((duration-t)/.06, 1)
    elif kind == 'pad':
        sound = sum(np.sin(2*np.pi*hz*(1+d)*t) for d in [-.0025,0,.0025])/3
        sound += .12*np.sin(4*np.pi*hz*t)
        env = np.minimum(t/.07, 1)*np.minimum((duration-t)/.22, 1)*.6
    else:
        sound = np.sin(2*np.pi*hz*t)+.24*np.sin(4*np.pi*hz*t)+.09*np.sin(6*np.pi*hz*t)
        env = np.minimum(t/.004, 1)*np.exp(-t*7)*np.minimum((duration-t)/.04, 1)
    return sound * env

chords = [(48,52,55,59), (43,47,50,55), (45,48,52,55), (41,45,48,52)]
melody = [76,79,83,79,74,79,71,74,76,81,84,81,72,77,81,79]
for b in range(32):
    at = b*BEAT
    t = np.arange(round(.33*SR))/SR
    phase = 2*np.pi*(48*t + 100*.027*(1-np.exp(-t/.027)))
    kick = np.sin(phase)*np.exp(-t*15)+.12*rng.normal(size=len(t))*np.exp(-t*180)
    add(kick, at, .82)
    if b%4 in (1,3):
        t = np.arange(round(.18*SR))/SR
        noise = rng.normal(size=len(t))
        hp = noise-np.convolve(noise, np.ones(30)/30, 'same')
        add(hp*np.exp(-t*29)*(1+.4*np.sin(t*2*np.pi*80)), at, .20)
    chord = chords[(b//4)%4]
    for shift in [0, .5, .75]:
        add(tone(chord[0]-12, .25, 'bass'), at+shift*BEAT, .32 if shift == 0 else .24)
    if b%4 == 0:
        for n in chord:
            add(tone(n+12, BEAT*3.8, 'pad'), at, .072, (n-chord[0])/18-.3)
    for h in [0,.5]:
        t = np.arange(round(.075*SR))/SR
        noise = rng.normal(size=len(t))
        hp = noise-np.convolve(noise, np.ones(9)/9, 'same')
        add(hp*np.exp(-t*65), at+h*BEAT, .065 if h == 0 else .10, -.3 if h == 0 else .3)
    note = melody[b%16]
    add(tone(note, .48), at+.5*BEAT, .20, .2)
    add(tone(note, .48), at+.5*BEAT+.234, .065, -.6)
    add(tone(note, .48), at+.5*BEAT+.469, .035, .6)
    add(tone(chord[b%4]+24, .3), at+.75*BEAT, .06, -.35)
for at in (3.55, 8.55):
    t = np.arange(round(.45*SR))/SR
    noise = np.convolve(rng.normal(size=len(t)), np.ones(8)/8, 'same')
    add(noise*(t/.45)**2*.17, at, .8)
for at in (0,4,9):
    for n in (84,88,91): add(tone(n,.7), at, .095, (n-88)/10)
time = np.arange(len(mix))/SR
mix *= (np.minimum(time/.025, 1)*np.clip((DURATION-time)/.55,0,1))[:,None]
mix = np.tanh(mix*1.15)
mix *= .92 / max(np.max(np.abs(mix)),.001)
path = Path(__file__).resolve().parents[1]/'public'/'doctorcell-electro-original.wav'
with wave.open(str(path), 'wb') as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(SR)
    wav.writeframes((mix*32767).astype('<i2').tobytes())
print(f'Original music: {DURATION}s, 128 BPM, stereo 48kHz; peak {np.max(np.abs(mix)):.3f}')
