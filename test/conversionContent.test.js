import assert from 'node:assert/strict';
import test from 'node:test';
import { activePromotions, priceLabel } from '../src/data/conversionContent.js';
test('expired, disabled, future and undated promotions are never shown', () => {
  const offer = { enabled: true, startsAt: '2026-10-01T00:00:00-05:00', endsAt: '2026-10-31T23:59:59-05:00' };
  assert.equal(activePromotions([offer], Date.parse('2026-11-14T12:00:00-05:00')).length, 0);
  assert.equal(activePromotions([offer], Date.parse('2026-09-30T12:00:00-05:00')).length, 0);
  assert.equal(activePromotions([{ ...offer, enabled: false }, { enabled: true }], Date.parse('2026-10-15T12:00:00-05:00')).length, 0);
  assert.equal(activePromotions([offer], Date.parse('2026-10-15T12:00:00-05:00')).length, 1);
});
test('price ranges require verified finite nonnegative ordered amounts', () => {
  for (const row of [{}, { verified: false, min: 10, max: 20 }, { verified: true, min: null, max: null }, { verified: true, min: 20, max: 10 }]) assert.equal(priceLabel(row), 'Solicitar cotización');
  assert.equal(priceLabel({ verified: true, min: 10, max: 20 }), '$10–$20 USD');
});
