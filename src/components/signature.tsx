import Sidenote from './Sidenote'

export default function Signature() {
	return (
		<>
			<div className="signature">Madison</div>
			<div className="w-full">
				<Sidenote>and Shawn</Sidenote>
				<Sidenote head="scoop">and Scoop</Sidenote>
				<Sidenote head="bluebell">and BlueBell!</Sidenote>
			</div>
		</>
	)
}
