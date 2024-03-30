import {React} from "react";
import "./App.css";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import History from './pages/History'
import Notebook from './pages/Notebook';
import Theme from './pages/Theme';
import NavBar from './components/NavBar';
import Welcom from './pages/Welcom';
import Calculator from './pages/homePages/Calculator';
import Converters from './pages/homePages/Converters';
import Estimators from './pages/homePages/Estimators';
import CheatSheat from './pages/homePages/CheatSheat';


import Calculus from './pages/homePages/AllCalculators/Calculus';
import Algebra from './pages/homePages/AllCalculators/Algebra';
import Statistics from './pages/homePages/AllCalculators/State';
import PointSlope from "./pages/homePages/AllCalculators/Calculus/Slope/PointSlope";
import SlopeInterceptCalculator from "./pages/homePages/AllCalculators/Calculus/GraphsOfFunctions/SlopeInterceptCalculator";
import Derivatives from '../src/pages/homePages/AllCalculators/Calculus/derivatives/Derivatives';
import IntegralCalculator from '../src/pages/homePages/AllCalculators/Calculus/Integration/DefiniteIntegral';
import Basic from './pages/homePages/AllCalculators/Algebra/Basic';
import Quardratic from './pages/homePages/AllCalculators/Algebra/Quardratic';
import Lcm from './pages/homePages/AllCalculators/Algebra/Lcm' ;
import PrimeFactorization from "./pages/homePages/AllCalculators/Algebra/PrimeFactor";
import LinearEquationsSolver from './pages/homePages/AllCalculators/Algebra/SolveFor'; 
import MathExpressionConverter from './pages/homePages/AllCalculators/Algebra/Simplify';

import ArithmeticMeanCalculator from "./pages/homePages/AllCalculators/Statistics/Mean";
import GeometricMeanCalculator from "./pages/homePages/AllCalculators/Statistics/GeometricMean";
import QuadraticMeanCalculator from "./pages/homePages/AllCalculators/Statistics/QuardraticMean";
import AverageCalculator from "./pages/homePages/AllCalculators/Statistics/Average";
import MedianCalculator from "./pages/homePages/AllCalculators/Statistics/Median";
import ModeCalculator from "./pages/homePages/AllCalculators/Statistics/Mode";
import StandardDeviationCalculator from "./pages/homePages/AllCalculators/Statistics/StandardDeviation";
import VarianceCalculator from "./pages/homePages/AllCalculators/Statistics/Varience";
import Others from "./pages/homePages/AllCalculators/Others";
import AgeCalculator from "./pages/homePages/AllCalculators/Others/AgeCalculator";
import PercentageCalculator from "./pages/homePages/AllCalculators/Others/Percentage";
import BMICalculator from "./pages/homePages/AllCalculators/Others/BMI";

import AreaConverter from './pages/homePages/converters/Area';
import LengthConverter from "./pages/homePages/converters/Length";
import TemperatureConverter from "./pages/homePages/converters/Temperature";
import VolumeConverter from "./pages/homePages/converters/Volume";
import WeightConverter from "./pages/homePages/converters/Weight";
import SteelWeightCalculator from "./pages/homePages/estimators/SteelWeight";
import TileQuantityCalculator from "./pages/homePages/estimators/TileQuantity";
import PaintQuantityCalculator from "./pages/homePages/estimators/PaintQuantity";
function App() {
    
    return (
        <>
                    <Router>
                    <NavBar />
                       
                           
                    <div className="pages">
                    
                    <Routes>
                    <Route path="/" element={<Welcom />} />


                        <Route path="/home" element={<Home />} />
                        <Route  path="/History" element={<History />} />
                        <Route path="/Notebook" element={<Notebook />} />
                        <Route path="/Theme" element={<Theme />} />


                        <Route path="/calculators" element={<Calculator />} />
                        <Route path="/converters" element={<Converters />} />
                        <Route path="/estimators" element={<Estimators />} />
                        <Route path="/cheatSheat" element={<CheatSheat />} />


                        <Route path="/calculus" element={<Calculus />} />
                        <Route path="/algebra" element={<Algebra />} />
                        <Route path="/statistics" element={<Statistics />} />


                        <Route path="/pointSlope" element={<PointSlope />} />
                        <Route path="/graphs" element={<SlopeInterceptCalculator />} />
                        <Route path="/derivative" element={<Derivatives />} />
                        <Route path="/integral" element={<IntegralCalculator />}/>

                        <Route path="/linear" element={<Basic />}/>
                        <Route path="/quadraticequation" element={<Quardratic />}/>
                        <Route path="/lcm" element={<Lcm />}/>
                        <Route path="/primeFactor" element={<PrimeFactorization />}/>
                        <Route path="/SolveFor" element={<LinearEquationsSolver />}/>
                        <Route path="/simplify" element={<MathExpressionConverter />}/>


                        <Route path="/mean" element={<ArithmeticMeanCalculator />}/>
                        <Route path="/geometricMean" element={<GeometricMeanCalculator />}/>
                        <Route path="/quadraticmean" element={<QuadraticMeanCalculator />}/>
                        <Route path="/average" element={<AverageCalculator />}/>
                        <Route path="/median" element={<MedianCalculator />}/>
                        <Route path="/mode" element={<ModeCalculator />}/>
                        <Route path="/deviation" element={<StandardDeviationCalculator />}/>
                        <Route path="/variance" element={<VarianceCalculator />}/>

                        <Route path="/others" element={<Others />}/>
                        <Route path="/age" element={<AgeCalculator />}/>
                        <Route path="/percentage" element={<PercentageCalculator />}/>
                        <Route path="/bmi" element={<BMICalculator />}/>

                        <Route path="/area" element={<AreaConverter />}/>
                        <Route path="/length" element={<LengthConverter />}/>
                        <Route path="/temperature" element={<TemperatureConverter />}/>
                        <Route path="/volume" element={<VolumeConverter />}/>
                        <Route path="/weight" element={<WeightConverter />}/>



                        <Route path="/steelWeight" element={<SteelWeightCalculator />}/>
                        <Route path="/tileCalculator" element={<TileQuantityCalculator />}/>
                        <Route path="/paintQuantity" element={<PaintQuantityCalculator />}/>
                    </Routes>
                    
                    </div>
                </Router>

                
        </>
    );
}
export default App