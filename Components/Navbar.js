import { NavItems } from "./NavItems.js";

document.getElementById('navbar').innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="../utils/images/logo.png" class="img-fluid" style="max-width: 100px;" alt="logo">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    ${NavItems()}
                </ul>
            </div>
        </div>
    </nav>
`;
