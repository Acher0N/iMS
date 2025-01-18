const generateRandomGradient = (circleCount) => {
  const randomColor = () =>
    `hsla(${Math.floor(Math.random() * 360)}, ${50 + Math.random() * 50}%, ${40 + Math.random() * 40}%, ${Math.random().toFixed(2)})`;

  const randomPosition = () => `${Math.floor(Math.random() * 100)}%`;

  // Generate the specified number of radial gradients
  const gradients = Array.from({ length: circleCount }, () => ({
    color: randomColor(),
    positionX: randomPosition(),
    positionY: randomPosition(),
    size: Math.floor(20 + Math.random() * 60), // Initial size
  }));

  return gradients;
};

/*
  const [gradients, setGradients] = useState(() => generateRandomGradient(10));

  useEffect(() => {
    setGradients((currentGradients) =>
      currentGradients.map((gradient) => ({
        ...gradient,
        positionX: `${Math.floor(Math.random() * 100)}%`, // Random X movement
        positionY: `${Math.floor(Math.random() * 100)}%`, // Random Y movement
        size: Math.floor(20 + Math.random() * 80), // Random size between 20px and 80px
      }))
    );
  }, []);

  const backgroundImage = gradients
    .map((gradient) => `radial-gradient(at ${gradient.positionX} ${gradient.positionY}, ${gradient.color} 0px, transparent ${gradient.size}%)`)
    .join(", ");

*/

/*

<Titlebar title={"Inventory Management System"} />
<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
    Delete Item
  </Button>

  <Confirm
    isOpen={isConfirmOpen}
    title="Are you sure you want to delete this item?"
    onConfirm={handleDelete}
    onCancel={() => setConfirmOpen(false)}
    fullscreen={false} // Use fullscreen only when needed
  >
    <h1 style={{ textAlign: "center", fontSize: "5rem", margin: "0" }}>Preview</h1>
  </Confirm>
  <Button variant="contained" color="success" onClick={() => toast.info("Item added successfully!")}>
    Toast
  </Button>
</Box>
*/
