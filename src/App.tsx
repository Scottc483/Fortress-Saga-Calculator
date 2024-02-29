import {  useState } from "react";
import "./App.css";

interface IndexSheet {
  [key: string]: number;
}

interface Result {
  stat: string;
  cost: string;
  powerIncrease: string;
  powerGold: string;
  efficiency: number;
  priority?: string;
}

function App() {
  const IndexSheet: IndexSheet = {
    "-": 1.0,
    a: 1.0e3,
    b: 1.0e6,
    c: 1.0e9,
    d: 1.0e12,
    e: 1.0e15,
    f: 1.0e18,
    g: 1.0e21,
    h: 1.0e24,
    i: 1.0e27,
    j: 1.0e30,
    k: 1.0e33,
    l: 1.0e36,
    m: 1.0e39,
    n: 1.0e42,
    o: 1.0e45,
    q: 1.0e48,
    r: 1.0e51,
    s: 1.0e54,
    t: 1.0e57,
    u: 1.0e60,
    v: 1.0e63,
    w: 1.0e66,
    x: 1.0e69,
    y: 1.0e72,
    z: 1.0e75,
  };

  const [atk, setAtk] = useState("");
  const [atkAbr, setAtkAbr] = useState("");
  const [atkIncrease, setAtkIncrease] = useState("");
  const [atkIncreaseAbr, setAtkIncreaseAbr] = useState("");

  const [critDamage, setCritDamage] = useState("");
  const [critDamageAbr, setCritDamageAbr] = useState("");
  const [critDamageIncrease, setCritDamageIncrease] = useState("");
  const [critDamageIncreaseAbr, setCritDamageIncreaseAbr] = useState("");

  const [atkPercent, setAtkPercent] = useState("");
  const [atkPercentAbr, setAtkPercentAbr] = useState("");
  const [atkPercentIncrease, setAtkPercentIncrease] = useState("");
  const [atkPercentIncreaseAbr, setAtkPercentIncreaseAbr] = useState("");

  const [results, setResults] = useState<Result[]>([]);

  const calculateResults = (): Result[] => {
    // Perform calculations based on user inputs

    //atk calculations
    const atkCost: number = parseFloat(atk) * IndexSheet[atkAbr];
    const atkPowerIncrease: number =
      parseFloat(atkIncrease) * IndexSheet[atkIncreaseAbr];
    const atkPowerGold: number = atkPowerIncrease / atkCost;
    const atkEfficiency: number = Math.round(atkPowerGold * 100);
    const formattedAtkPowerGold: string = atkPowerGold.toExponential(2);

    //critDamage calculations
    const critDamageCost: number =
      parseFloat(critDamage) * IndexSheet[critDamageAbr];
    const critDamagePowerIncrease: number =
      parseFloat(critDamageIncrease) * IndexSheet[critDamageIncreaseAbr];
    const critDamagePowerGold: number =
      critDamagePowerIncrease / critDamageCost;
    const critDamageEfficiency: number = Math.round(critDamagePowerGold * 100);
    const formattedCritDamagePowerGold: string =
      critDamagePowerGold.toExponential(2);

    //atkPercent calculations
    const atkPercentCost: number =
      parseFloat(atkPercent) * IndexSheet[atkPercentAbr];
    const atkPercentPowerIncrease: number =
      parseFloat(atkPercentIncrease) * IndexSheet[atkPercentIncreaseAbr];
    const atkPercentPowerGold: number =
      atkPercentPowerIncrease / atkPercentCost;
    const atkPercentEfficiency: number = Math.round(atkPercentPowerGold * 100);
    const formattedAtkPercentPowerGold: string =
      atkPercentPowerGold.toExponential(2);

    // Find the minimum power/gold
    const minPowerGold = Math.min(
      atkPowerGold,
      critDamagePowerGold,
      atkPercentPowerGold
    );

    const allResults: Result[] = [
      {
        stat: "Attack",
        cost: atk + atkAbr,
        powerIncrease: atkIncrease + atkIncreaseAbr,
        powerGold: formattedAtkPowerGold,
        efficiency: atkEfficiency,
      },
      {
        stat: "Crit Damage",
        cost: critDamage + critDamageAbr,
        powerIncrease: critDamageIncrease + critDamageIncreaseAbr,
        powerGold: formattedCritDamagePowerGold,
        efficiency: critDamageEfficiency,
      },
      {
        stat: "Attack %",
        cost: atkPercent + atkPercentAbr,
        powerIncrease: atkPercentIncrease + atkPercentIncreaseAbr,
        powerGold: formattedAtkPercentPowerGold,
        efficiency: atkPercentEfficiency,
      },
      // map through the results and calculate the efficiency of each stat
    ].map((result) => ({
      ...result,
      efficiency: Math.round(
        (parseFloat(result.powerGold) / minPowerGold) * 100
      ),
    }));
  
    // Sort the results by efficiency in descending order
    const sortedResults = allResults.slice().sort((a, b) => b.efficiency - a.efficiency);

    // Determine the most efficient, second best, and least efficient options
    const mostEfficient = sortedResults[0];
    const secondBest = sortedResults[1];
    const leastEfficient = sortedResults[sortedResults.length - 1];
    
    // Add priority string to each result without changing the order
    const updatedResults = allResults.map(result => {
      if (result === mostEfficient) {
        return { ...result, priority: "Most Efficient" };
      } else if (result === secondBest) {
        return { ...result, priority: "Second Best" };
      } else if (result === leastEfficient) {
        return { ...result, priority: "Least Efficient" };
      } else {
        return result;
      }
    });
    console.log(updatedResults);
    // Return the results
    return updatedResults;
  };

  return (
    <>
      <body className="bg-gray-100 h-full w-full">
        <div className="h-screen flex flex-col items-center justify-center">
          {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center">
      Fortress Saga Stat Upgrade Calculator
    </h1> */}
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row mb-4">
            <div className="flex flex-col mb-4 sm:mr-4">
              <label className="text-lg mb-2">Attack Cost</label>
              <div className="flex">
                <input
                  className="border p-2 mb-2"
                  type="text"
                  id="atk"
                  name="atk"
                  value={atk}
                  onChange={(e) => setAtk(e.target.value)}
                  placeholder="Enter value"
                />
                <select
                  className="border p-2 mb-2"
                  id="atkAbr"
                  name="atkAbr"
                  value={atkAbr}
                  onChange={(e) => setAtkAbr(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Object.keys(IndexSheet).map((abbreviation) => (
                    <option key={abbreviation} value={abbreviation}>
                      {abbreviation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2">Attack Increase</label>
              <div className="flex">
                <input
                  className="border p-2 mb-2"
                  type="text"
                  id="atkIncrease"
                  name="atkIncrease"
                  value={atkIncrease}
                  onChange={(e) => setAtkIncrease(e.target.value)}
                  placeholder="Enter value"
                />
                <select
                  className="border p-2 mb-2"
                  id="atkIncreaseAbr"
                  name="atkIncreaseAbr"
                  value={atkIncreaseAbr}
                  onChange={(e) => setAtkIncreaseAbr(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Object.keys(IndexSheet).map((abbreviation) => (
                    <option key={abbreviation} value={abbreviation}>
                      {abbreviation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row mb-4">
            <div className="flex flex-col mb-4 sm:mr-4">
              <label className="text-lg mb-2">Crit Damage Cost</label>
              <div className="flex">
                <input
                  className="border p-2 mb-2"
                  type="text"
                  id="critDamage"
                  name="critDamage"
                  value={critDamage}
                  onChange={(e) => setCritDamage(e.target.value)}
                  placeholder="Enter value"
                />
                <select
                  className="border p-2 mb-2"
                  id="critDamageAbr"
                  name="critDamageAbr"
                  value={critDamageAbr}
                  onChange={(e) => setCritDamageAbr(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Object.keys(IndexSheet).map((abbreviation) => (
                    <option key={abbreviation} value={abbreviation}>
                      {abbreviation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2">Crit Damage Increase</label>
              <div className="flex">
                <input
                  className="border p-2 mb-2"
                  type="text"
                  id="critDamageIncrease"
                  name="critDamageIncrease"
                  value={critDamageIncrease}
                  onChange={(e) => setCritDamageIncrease(e.target.value)}
                  placeholder="Enter value"
                />
                <select
                  className="border p-2 mb-2"
                  id="critDamageIncreaseAbr"
                  name="critDamageIncreaseAbr"
                  value={critDamageIncreaseAbr}
                  onChange={(e) => setCritDamageIncreaseAbr(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Object.keys(IndexSheet).map((abbreviation) => (
                    <option key={abbreviation} value={abbreviation}>
                      {abbreviation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
            <div className="flex flex-col mb-4 sm:mr-4">
              <label className="text-lg mb-2">Attack % Cost</label>
              <div className="flex">
                <input
                  className="border p-2 mb-2"
                  type="text"
                  id="atkPercent"
                  name="atkPercent"
                  value={atkPercent}
                  onChange={(e) => setAtkPercent(e.target.value)}
                  placeholder="Enter value"
                />
                <select
                  className="border p-2 mb-2"
                  id="atkPercentAbr"
                  name="atkPercentAbr"
                  value={atkPercentAbr}
                  onChange={(e) => setAtkPercentAbr(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Object.keys(IndexSheet).map((abbreviation) => (
                    <option key={abbreviation} value={abbreviation}>
                      {abbreviation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2">Attack % Increase</label>
              <div className="flex">
                <input
                  className="border p-2 mb-2"
                  type="text"
                  id="atkPercentIncrease"
                  name="atkPercentIncrease"
                  value={atkPercentIncrease}
                  onChange={(e) => setAtkPercentIncrease(e.target.value)}
                  placeholder="Enter value"
                />
                <select
                  className="border p-2 mb-2"
                  id="atkPercentIncreaseAbr"
                  name="atkPercentIncreaseAbr"
                  value={atkPercentIncreaseAbr}
                  onChange={(e) => setAtkPercentIncreaseAbr(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Object.keys(IndexSheet).map((abbreviation) => (
                    <option key={abbreviation} value={abbreviation}>
                      {abbreviation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => setResults(calculateResults())}
          >
            Calculate
          </button>
          <div className="flex items-center justify-center">
  <div className="container">
    {results.map((result, index) => (
      <table key={index} className="w-full flex flex-row flex-no-wrap bg-white rounded-lg overflow-hidden shadow-lg my-5 sm:w-full sm:table sm:shadow-none">
        <thead className="text-white bg-teal-400">
          <tr className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th className="p-3 text-left">Stat</th>
            <th className="p-3 text-left">Cost</th>
            <th className="p-3 text-left">Power Increase</th>
            <th className="p-3 text-left">Power/Gold</th>
            <th className="p-3 text-left">Efficiency</th>
            <th className="p-3 text-left">Priority</th>
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none">
          <tr className={`flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
            <td className="border-grey-light border hover:bg-gray-100 p-3">{result.stat}</td>
            <td className="border-grey-light border hover:bg-gray-100 p-3">{result.cost}</td>
            <td className="border-grey-light border hover:bg-gray-100 p-3">{result.powerIncrease}</td>
            <td className="border-grey-light border hover:bg-gray-100 p-3">{result.powerGold}</td>
            <td className="border-grey-light border hover:bg-gray-100 p-3">{result.efficiency}%</td>
            <td className="border-grey-light border hover:bg-gray-100 p-3">{result.priority}</td>
          </tr>
        </tbody>
      </table>
    ))}
  </div>
</div>

        </div>
      </body>
    </>
  );
}

export default App;
