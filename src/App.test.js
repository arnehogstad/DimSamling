import {isLeilighetFucntion} from './components/tools/varmtvann/BeregnVV'


test('true test', () => {
  expect(isLeilighetFucntion("Leilighet (3+ personer)")).toBeTruthy();
  expect(isLeilighetFucntion("Leilighet (2-3 personer)")).toBeTruthy();
    
});